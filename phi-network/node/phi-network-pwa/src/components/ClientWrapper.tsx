// src/components/ClientWrapper.tsx
"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((error) => console.error("❌ Service Worker Registration Failed:", error));
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};

export default ClientWrapper;
