// src/components/SmoldotManager.tsx
"use client";

import { useEffect, useState } from "react";
import StatusIndicator from "./StatusIndicator";
import type { Smoldot } from "smoldot"; // Ensure Smoldot exports types
import { BlockData, BlockInfo } from "../types";

interface BlockData {
  blockNumber: number;
  transactions: number;
  timestamp: string;
}

interface BlockInfo {
  header: {
    number: {
      toNumber: () => number;
    };
    timestamp?: number; // Assuming timestamp is in seconds
  };
  extrinsics: unknown[]; // Replace 'unknown' with specific type if available
}

const SmoldotManager: React.FC = () => {
  const [blockchainStatus, setBlockchainStatus] = useState<string>("🌐 Starting Blockchain...");
  const [nodeStatus, setNodeStatus] = useState<string>("🔄 Initializing...");
  const [chainSpec, setChainSpec] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChainSpec = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/phi_network_raw.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setChainSpec(JSON.stringify(data));
        console.log("✅ Loaded Chain Spec");
      } catch (err: unknown) {
        console.error("❌ Failed to load chain spec:", err);
        if (err instanceof Error) {
          setBlockchainStatus(`❌ Error: ${err.message}`);
          setError("Failed to load blockchain specifications. Please try again later.");
        } else {
          setBlockchainStatus(`❌ Unknown Error`);
          setError("Failed to load blockchain specifications. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadChainSpec();
  }, []);

  useEffect(() => {
    if (!chainSpec) return;

    let smoldotNode: Smoldot | null = null;

    const handleBlockAdded = (blockInfo: BlockInfo) => {
      const { header, extrinsics } = blockInfo;
      const blockNumber = header.number.toNumber();
      const transactions = extrinsics.length;

      const timestamp = header.timestamp
        ? new Date(header.timestamp * 1000).toLocaleTimeString()
        : new Date().toLocaleTimeString();

      setBlocks((prevBlocks: BlockData[]) => {
        const newBlocks = [...prevBlocks, { blockNumber, transactions, timestamp }];
        if (newBlocks.length > 20) newBlocks.shift(); // Keep only the latest 20 blocks
        return newBlocks;
      });
    };

    const startSmoldot = async () => {
      try {
        const { start } = await import("smoldot"); // Dynamically import Smoldot
        smoldotNode = start();
        console.log("✅ Smoldot Full Node Started Inside PWA");
        setNodeStatus("✅ Running Full Node");

        await smoldotNode.addChain({
          chainSpec,
          blockAdded: handleBlockAdded,
        });

        console.log("✅ Blockchain Connected!");
        setBlockchainStatus("✅ Blockchain Running!");
      } catch (err: unknown) {
        console.error("❌ Smoldot Integration Error:", err);
        if (err instanceof Error) {
          setBlockchainStatus(`❌ Error: ${err.message}`);
        } else {
          setBlockchainStatus(`❌ Unknown Error`);
        }
      }
    };

    startSmoldot();

    return () => {
      if (smoldotNode) {
        smoldotNode.terminate();
        console.log("🔴 Smoldot Node Terminated");
        setNodeStatus("❌ Node Stopped");
      }
    };
  }, [chainSpec]);

  return (
    <>
      <StatusIndicator label="Blockchain Status" status={blockchainStatus} />
      <StatusIndicator label="Node Status" status={nodeStatus} />

      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-400 text-center">
          {error}
        </div>
      )}

      {!isLoading && blocks.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Latest Block Transactions</h2>
          {/* Replace with your BlockChart component */}
          {/* <BlockChart data={blocks} onBlockClick={(block) => setSelectedBlock(block)} /> */}
        </div>
      )}
    </>
  );
};

export default SmoldotManager;
