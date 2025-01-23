"use client";

import React, { type ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { solana, solanaDevnet, solanaTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import { projectId, solanaWeb3JsAdapter } from "@/config";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
export const appKitMetadata = {
  name: "ArvynFi",
  description:
    "ArvynFi is a decentralized wallet designed for Solana blockchain users.",
  url: "https://arvynfi.vercel.app", 
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks: [solana, solanaTestnet, solanaDevnet],
  defaultNetwork: solana,
  metadata: appKitMetadata,
  themeMode: "dark",
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
});

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

export default ContextProvider;
