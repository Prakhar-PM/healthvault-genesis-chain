
import { useState } from "react";
import { verifyHealthRecord } from "@/lib/blockchain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VerifyPage() {
  const [hashToVerify, setHashToVerify] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    checked: boolean;
    valid: boolean;
    blockDetails?: any;
  }>({
    checked: false,
    valid: false
  });

  const handleVerify = () => {
    if (!hashToVerify.trim()) return;
    
    const result = verifyHealthRecord(hashToVerify);
    
    setVerificationResult({
      checked: true,
      valid: result.valid,
      blockDetails: result.block
    });
  };

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-health-dark">Verify Health Record</h1>
      
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <CardTitle>Health Record Verification</CardTitle>
          <CardDescription>
            Verify the authenticity of any health record on the HealthVault blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verifyHash">Enter Record Hash</Label>
              <Input
                id="verifyHash"
                placeholder="Enter the verification hash code"
                value={hashToVerify}
                onChange={(e) => setHashToVerify(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-gray-500">
                This is the unique hash identifier provided with the health record
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleVerify} 
                className="w-full bg-health-primary hover:bg-health-secondary"
                disabled={!hashToVerify.trim()}
              >
                Verify Record
              </Button>
            </div>
            
            {verificationResult.checked && (
              <div className="pt-4">
                {verificationResult.valid ? (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <AlertTitle className="text-green-800">Verified Authentic Record</AlertTitle>
                    <AlertDescription className="text-green-700">
                      This health record exists on the HealthVault blockchain and has not been tampered with.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-red-50 text-red-800 border-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <AlertTitle className="text-red-800">Invalid Record</AlertTitle>
                    <AlertDescription className="text-red-700">
                      This health record could not be verified. It either doesn't exist or has been tampered with.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        {verificationResult.checked && verificationResult.valid && verificationResult.blockDetails && (
          <CardFooter className="flex flex-col">
            <div className="w-full pt-4 border-t">
              <h3 className="font-bold text-lg mb-3">Record Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Record Type</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    {verificationResult.blockDetails.data.recordType}
                  </div>
                </div>
                <div>
                  <Label>Record ID</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    {verificationResult.blockDetails.data.recordId}
                  </div>
                </div>
                <div>
                  <Label>Date Created</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    {new Date(verificationResult.blockDetails.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <Label>Issuing Hospital</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    {verificationResult.blockDetails.data.hospitalId}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label>Description</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    {verificationResult.blockDetails.data.description}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label>Patient ID</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1 font-mono">
                    {verificationResult.blockDetails.data.patientId}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label>Blockchain Position</Label>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    Block #{verificationResult.blockDetails.index}
                  </div>
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
