// src/types/index.ts
export interface BlockData {
    blockNumber: number;
    transactions: number;
    timestamp: string;
  }
  
  export interface BlockInfo {
    header: {
      number: {
        toNumber: () => number;
      };
      timestamp?: number;
    };
    extrinsics: unknown[];
  }
  