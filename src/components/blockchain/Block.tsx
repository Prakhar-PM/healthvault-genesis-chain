
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export interface BlockData {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  data: {
    patientId: string;
    hospitalId: string;
    recordType: string;
    recordId: string;
    description: string;
  };
  nonce: number;
}

interface BlockProps {
  block: BlockData;
  isLatest?: boolean;
}

export function Block({ block, isLatest }: BlockProps) {
  return (
    <Card className={`w-full shadow-md ${isLatest ? 'border-health-primary border-2' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Block #{block.index}</CardTitle>
          {isLatest && (
            <Badge className="bg-health-primary hover:bg-health-secondary text-white">Latest</Badge>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {format(new Date(block.timestamp), "PPpp")}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Record Type:</span> {block.data.recordType}
          </div>
          <div>
            <span className="font-semibold">Description:</span> {block.data.description}
          </div>
          <div className="pt-2">
            <span className="font-semibold">Hash:</span>
            <div className="bg-gray-100 p-1 rounded text-xs overflow-hidden text-ellipsis font-mono mt-1">
              {block.hash}
            </div>
          </div>
          <div>
            <span className="font-semibold">Previous Hash:</span>
            <div className="bg-gray-100 p-1 rounded text-xs overflow-hidden text-ellipsis font-mono mt-1">
              {block.previousHash}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-gray-500">
        <div className="flex justify-between w-full">
          <span>Patient: {block.data.patientId.substring(0, 8)}...</span>
          <span>Hospital: {block.data.hospitalId.substring(0, 8)}...</span>
        </div>
      </CardFooter>
    </Card>
  );
}
