// src/components/BlockModal.tsx
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface BlockData {
  blockNumber: number;
  transactions: number;
  timestamp: string;
}

interface BlockModalProps {
  block: BlockData;
  onClose: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({ block, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
          aria-label="Close Modal"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Block #{block.blockNumber}</h2>
        <p><strong>Timestamp:</strong> {block.timestamp}</p>
        <p><strong>Transactions:</strong> {block.transactions}</p>
        {/* Add more detailed information as needed */}
      </motion.div>
    </motion.div>
  );
};

export default BlockModal;
