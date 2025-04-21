
import { useState, useEffect } from "react";
import { Block as BlockComponent } from "@/components/blockchain/Block";
import { BlockData } from "@/components/blockchain/Block";
import { healthVaultChain } from "@/lib/blockchain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BlockchainExplorer() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"hash" | "patient" | "hospital">("hash");
  const [filteredBlocks, setFilteredBlocks] = useState<BlockData[]>([]);
  const [stats, setStats] = useState({
    totalBlocks: 0,
    totalPatients: 0,
    totalHospitals: 0,
    latestBlock: null as BlockData | null
  });

  useEffect(() => {
    // Convert Block objects to BlockData objects
    const allBlocks = healthVaultChain.chain as unknown as BlockData[];
    setBlocks(allBlocks);
    setFilteredBlocks(allBlocks);
    
    // Calculate stats
    const patients = new Set();
    const hospitals = new Set();
    
    allBlocks.forEach(block => {
      if (block.data.patientId !== 'genesis') {
        patients.add(block.data.patientId);
      }
      if (block.data.hospitalId !== 'genesis') {
        hospitals.add(block.data.hospitalId);
      }
    });
    
    setStats({
      totalBlocks: allBlocks.length,
      totalPatients: patients.size,
      totalHospitals: hospitals.size,
      latestBlock: allBlocks.length > 0 ? allBlocks[allBlocks.length - 1] : null
    });
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBlocks(blocks);
      return;
    }
    
    let results;
    
    switch (searchType) {
      case "hash":
        results = blocks.filter(block => 
          block.hash.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case "patient":
        results = blocks.filter(block => 
          block.data.patientId.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case "hospital":
        results = blocks.filter(block => 
          block.data.hospitalId.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      default:
        results = blocks;
    }
    
    setFilteredBlocks(results);
  };

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value as "hash" | "patient" | "hospital");
  };

  const resetSearch = () => {
    setSearchQuery("");
    setFilteredBlocks(blocks);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-health-dark">Blockchain Explorer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-health-primary to-health-secondary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalBlocks}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-health-blue to-health-bright-blue text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalPatients}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-health-dark to-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalHospitals}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Chain Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-lg font-medium">Valid</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Blockchain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="searchQuery" className="sr-only">Search Query</Label>
              <Input
                id="searchQuery"
                placeholder={`Search by ${searchType}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Tabs value={searchType} onValueChange={handleSearchTypeChange} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="hash">Hash</TabsTrigger>
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="hospital">Hospital</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                className="bg-health-primary hover:bg-health-secondary"
              >
                Search
              </Button>
              <Button 
                variant="outline" 
                onClick={resetSearch}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBlocks.length > 0 ? (
              filteredBlocks.map((block, index) => (
                <BlockComponent 
                  key={block.hash} 
                  block={block} 
                  isLatest={index === filteredBlocks.length - 1}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No blocks match your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
