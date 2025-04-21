
import { useState, useEffect } from "react";
import { Block as BlockComponent } from "@/components/blockchain/Block";
import { BlockData } from "@/components/blockchain/Block";
import { healthVaultChain } from "@/lib/blockchain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CURRENT_USER_ID = "P12345"; // Mock current user

export default function PatientPortal() {
  const [userRecords, setUserRecords] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlockHash, setSelectedBlockHash] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch user blocks
    const blocks = healthVaultChain.getBlocksByPatientId(CURRENT_USER_ID);
    setUserRecords(blocks as unknown as BlockData[]);
    setIsLoading(false);
  }, []);

  const shareRecord = (hash: string) => {
    // In a real app, this would generate a sharing link or QR code
    alert(`Record shared! Anyone with this code can verify this record: ${hash}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-health-dark">Patient Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label>Patient ID</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">{CURRENT_USER_ID}</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Name</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">John Doe</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Date of Birth</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">01/15/1985</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Total Records</Label>
                  <div className="bg-gray-100 p-2 rounded text-sm">{userRecords.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="records">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="records">My Health Records</TabsTrigger>
              <TabsTrigger value="access">Access Control</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>My Health Records</CardTitle>
                  <CardDescription>
                    All your medical records secured on the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-10">Loading records...</div>
                  ) : userRecords.length > 0 ? (
                    <div className="grid gap-4">
                      {userRecords.map((block) => (
                        <div key={block.hash} 
                             className="cursor-pointer" 
                             onClick={() => setSelectedBlockHash(block.hash)}>
                          <BlockComponent 
                            block={block} 
                            isLatest={block.hash === userRecords[userRecords.length - 1].hash} 
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p>No health records found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="access">
              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                  <CardDescription>
                    Manage who can access your health records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="shareWith">Share Record With</Label>
                      <div className="flex gap-2 mt-1">
                        <Input id="shareWith" placeholder="Enter doctor or hospital ID" />
                        <Button className="bg-health-primary hover:bg-health-secondary">
                          Grant Access
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Currently Shared With</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                          <div>
                            <p className="font-medium">Dr. Smith (D2001)</p>
                            <p className="text-sm text-gray-500">General Practitioner</p>
                          </div>
                          <Button variant="destructive" size="sm">Revoke</Button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                          <div>
                            <p className="font-medium">City Hospital (H10001)</p>
                            <p className="text-sm text-gray-500">All departments</p>
                          </div>
                          <Button variant="destructive" size="sm">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Access permissions are updated in real-time</p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {selectedBlockHash && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Record Details</CardTitle>
              <CardDescription>Detailed view of the selected record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRecords
                  .filter(block => block.hash === selectedBlockHash)
                  .map(block => (
                    <div key={block.hash}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Record Type</Label>
                          <div className="bg-gray-100 p-2 rounded mt-1">{block.data.recordType}</div>
                        </div>
                        <div>
                          <Label>Record ID</Label>
                          <div className="bg-gray-100 p-2 rounded mt-1">{block.data.recordId}</div>
                        </div>
                        <div>
                          <Label>Hospital</Label>
                          <div className="bg-gray-100 p-2 rounded mt-1">{block.data.hospitalId}</div>
                        </div>
                        <div>
                          <Label>Date</Label>
                          <div className="bg-gray-100 p-2 rounded mt-1">
                            {new Date(block.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <div className="bg-gray-100 p-2 rounded mt-1">{block.data.description}</div>
                        </div>
                        <div className="md:col-span-2">
                          <Label>Block Hash (Verification Code)</Label>
                          <div className="bg-gray-100 p-2 rounded font-mono text-xs mt-1 overflow-auto">
                            {block.hash}
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedBlockHash(null)}>
                Close Details
              </Button>
              <Button 
                className="bg-health-primary hover:bg-health-secondary"
                onClick={() => selectedBlockHash && shareRecord(selectedBlockHash)}
              >
                Share This Record
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
