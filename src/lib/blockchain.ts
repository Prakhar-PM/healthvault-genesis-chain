
import { SHA256 } from 'crypto-js';

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

export interface Record {
  patientId: string;
  hospitalId: string;
  recordType: string;
  recordId: string;
  description: string;
}

export class Block {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  data: Record;
  nonce: number;

  constructor(
    index: number,
    timestamp: number, 
    data: Record, 
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.index + 
      this.timestamp + 
      JSON.stringify(this.data) + 
      this.previousHash + 
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }

  isValid(): boolean {
    return this.hash === this.calculateHash();
  }
}

export class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), {
      patientId: 'genesis',
      hospitalId: 'genesis',
      recordType: 'Genesis Block',
      recordId: 'genesis',
      description: 'First block in the HealthVault chain'
    }, '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.isValid()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getBlockByHash(hash: string): Block | null {
    for (const block of this.chain) {
      if (block.hash === hash) {
        return block;
      }
    }
    return null;
  }

  getBlocksByPatientId(patientId: string): Block[] {
    return this.chain.filter(block => block.data.patientId === patientId);
  }

  getBlocksByHospitalId(hospitalId: string): Block[] {
    return this.chain.filter(block => block.data.hospitalId === hospitalId);
  }
}

// Create a singleton instance of the blockchain
export const healthVaultChain = new Blockchain();

// Generate some initial blocks for demonstration
export const generateInitialBlocks = () => {
  // Add some sample patient records
  const records: Record[] = [
    {
      patientId: 'P12345',
      hospitalId: 'H10001',
      recordType: 'Blood Test',
      recordId: 'BT78901',
      description: 'Complete Blood Count (CBC) results'
    },
    {
      patientId: 'P12345',
      hospitalId: 'H10002',
      recordType: 'Vaccination',
      recordId: 'V45678',
      description: 'COVID-19 Vaccination - First Dose'
    },
    {
      patientId: 'P67890',
      hospitalId: 'H10001',
      recordType: 'X-Ray',
      recordId: 'XR34567',
      description: 'Chest X-Ray Report'
    },
    {
      patientId: 'P12345',
      hospitalId: 'H10003',
      recordType: 'Prescription',
      recordId: 'PR23456',
      description: 'Antibiotic prescription for respiratory infection'
    }
  ];

  // Add each record as a new block
  records.forEach(record => {
    const newBlock = new Block(
      healthVaultChain.chain.length,
      Date.now(),
      record
    );
    healthVaultChain.addBlock(newBlock);
  });

  return healthVaultChain;
};

// Utility function to verify a health record
export const verifyHealthRecord = (blockHash: string): { valid: boolean; block?: Block } => {
  const block = healthVaultChain.getBlockByHash(blockHash);
  
  if (!block) {
    return { valid: false };
  }

  return { 
    valid: block.isValid() && 
    healthVaultChain.chain.some(b => b.hash === blockHash),
    block 
  };
};

// Initialize the blockchain with sample data
generateInitialBlocks();
