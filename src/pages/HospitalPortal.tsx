
import { useState } from "react";
import { Block as BlockComponent } from "@/components/blockchain/Block";
import { BlockData } from "@/components/blockchain/Block";
import { Block, Record, healthVaultChain } from "@/lib/blockchain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HOSPITAL_ID = "H10001"; // Mock hospital ID

export default function HospitalPortal() {
  const [hospitalRecords, setHospitalRecords] = useState<BlockData[]>(
    healthVaultChain.getBlocksByHospitalId(HOSPITAL_ID) as unknown as BlockData[]
  );

  const [newRecord, setNewRecord] = useState<Partial<Record>>({
    patientId: "",
    hospitalId: HOSPITAL_ID,
    recordType: "",
    recordId: `R${Date.now().toString().substring(8)}`,
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successHash, setSuccessHash] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Create new block
      const record = newRecord as Record;
      const newBlock = new Block(
        healthVaultChain.chain.length,
        Date.now(),
        record
      );
      
      healthVaultChain.addBlock(newBlock);
      
      // Update UI
      setHospitalRecords([
        ...(healthVaultChain.getBlocksByHospitalId(HOSPITAL_ID) as unknown as BlockData[])
      ]);
      
      setSuccessHash(newBlock.hash);
      setIsSubmitting(false);
      
      // Reset form
      setNewRecord({
        patientId: "",
        hospitalId: HOSPITAL_ID,
        recordType: "",
        recordId: `R${Date.now().toString().substring(8)}`,
        description: ""
      });
    }, 1500);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-health-dark">Hospital Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>Your medical facility details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label>Hospital ID</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">{HOSPITAL_ID}</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Name</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">City General Hospital</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Records Created</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">{hospitalRecords.length}</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Verification Status</Label>
                  <div className="bg-green-100 text-green-800 p-2 rounded text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    Verified Institution
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="create">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Record</TabsTrigger>
              <TabsTrigger value="history">Record History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Health Record</CardTitle>
                  <CardDescription>
                    Add a new medical record to the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="patientId">Patient ID</Label>
                          <Input 
                            id="patientId" 
                            name="patientId"
                            placeholder="Enter patient ID" 
                            value={newRecord.patientId}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="recordType">Record Type</Label>
                          <Select
                            value={newRecord.recordType}
                            onValueChange={(value) => handleSelectChange("recordType", value)}
                            required
                          >
                            <SelectTrigger id="recordType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="Prescription">Prescription</SelectItem>
                              <SelectItem value="Lab Test">Lab Test</SelectItem>
                              <SelectItem value="Vaccination">Vaccination</SelectItem>
                              <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                              <SelectItem value="Surgery">Surgery</SelectItem>
                              <SelectItem value="X-Ray">X-Ray</SelectItem>
                              <SelectItem value="MRI Scan">MRI Scan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="recordId">Record ID</Label>
                        <Input 
                          id="recordId" 
                          name="recordId"
                          value={newRecord.recordId}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          name="description"
                          placeholder="Enter detailed record description" 
                          className="h-24"
                          value={newRecord.description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-health-primary hover:bg-health-secondary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Add to Blockchain"}
                        </Button>
                      </div>
                    </div>
                  </form>
                  
                  {successHash && (
                    <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                      <p className="font-medium">Record successfully added to blockchain!</p>
                      <p className="text-sm mt-1">Verification Hash:</p>
                      <code className="block bg-white p-2 rounded text-xs mt-1 font-mono overflow-auto">
                        {successHash}
                      </code>
                      <p className="text-sm mt-2">
                        This hash can be used to verify the authenticity of this record.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Record History</CardTitle>
                  <CardDescription>
                    All medical records issued by this hospital
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hospitalRecords.length > 0 ? (
                    <div className="grid gap-4">
                      {hospitalRecords.map((block) => (
                        <BlockComponent 
                          key={block.hash} 
                          block={block} 
                          isLatest={block.hash === hospitalRecords[hospitalRecords.length - 1].hash} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p>No records have been issued yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
