// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaBook, FaDownload } from "react-icons/fa";
import Image from "next/image";
import StatusIndicator from "../components/StatusIndicator";
import ActionButton from "../components/ActionButton";
import BlockChart from "../components/BlockChart";
import BlockModal from "../components/BlockModal";
import ThemeToggle from "../components/ThemeToggle";
import SmoldotManager from "../components/SmoldotManager";
import { BlockData } from "../types";

interface BeforeInstallPromptEventExtended extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}

export default function Home() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEventExtended | null>(null);
  const [installAvailable, setInstallAvailable] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  // Detect iOS devices
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/(iphone|ipad|ipod)/.test(userAgent)) {
      setIsIOS(true);
    }
  }, []);

  // Handle PWA Install Event Correctly
  useEffect(() => {
    const handler = (event: Event) => {
      console.log("🔥 PWA Install Prompt Fired!");
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEventExtended);
      setInstallAvailable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("✅ PWA Installed Successfully!");
      } else {
        console.log("❌ PWA Installation Declined");
      }
      setInstallPrompt(null);
      setInstallAvailable(false);
    } else {
      if (isIOS) {
        alert("📱 To install the PWA, tap the Share button and select 'Add to Home Screen'.");
      } else {
        alert("⚠️ PWA install is not available. Please use the browser's install option.");
      }
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 text-white p-6 overflow-hidden transition-colors duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 10 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-500 opacity-30 rounded-full blur-xl"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500 opacity-10 rounded-full blur-xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        ></motion.div>
      </div>

      {/* Main Card */}
      <motion.div
        className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-4xl w-full z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex flex-col items-center">
          {/* Phi Network Logo */}
          <Image
            src="/image/logo.png" // Correct path to the logo in the public directory
            alt="Phi Network Logo"
            width={100}
            height={100}
            className="mb-4"
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 flex items-center justify-center">
            <span className="mr-2">✨ Phi Network ✨</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 animate-bounce"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 12 22 12 22C12 22 19 13.25 19 9C19 5.13401 15.866 2 12 2Z" />
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" />
            </motion.svg>
          </h1>

          {/* Status Indicators and Block Data */}
          <SmoldotManager />
          <StatusIndicator label="Active Nodes" status="12" />
          <BlockChart />

          {/* Install Button */}
          {installAvailable && (
            <div className="mt-6 flex flex-col items-center space-y-2">
              <ActionButton
                onClick={installPWA}
                gradientClasses="bg-gradient-to-r from-green-400 to-blue-500"
              >
                <FaDownload className="inline mr-2" /> 🚀 Install Phi Network PWA
              </ActionButton>
              {isIOS ? (
                <p className="text-sm text-gray-200">📱 Tap the Share button and select 'Add to Home Screen'.</p>
              ) : (
                <p className="text-sm text-gray-200">Install for a better experience</p>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Deploy Now Button - Installs PWA */}
            <motion.button
              onClick={installPWA}
              disabled={!installAvailable}
              whileHover={{ scale: installAvailable ? 1.05 : 1 }}
              whileTap={{ scale: installAvailable ? 0.95 : 1 }}
              className={`flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-300 ${
                !installAvailable ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Install Phi Network PWA"
            >
              <FaDownload className="mr-2" /> Install Node (Add To Home Screen)
            </motion.button>

            {/* Read Our Docs Button - Redirects to GitHub */}
            <motion.a
              href="https://github.com/phinetwork/docs" // Update to the correct GitHub docs URL
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-300"
              aria-label="Read Phi Network Documentation on GitHub"
            >
              <FaBook className="mr-2" /> Read Our Docs
            </motion.a>
          </div>

          {/* GitHub Repository Button */}
          <div className="mt-4">
            <motion.a
              href="https://github.com/phinetwork" // Update to your main GitHub repository
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
              aria-label="Visit Phi Network GitHub Repository"
            >
              <FaGithub className="mr-2" /> Visit GitHub
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Block Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <BlockModal block={selectedBlock} onClose={() => setSelectedBlock(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
