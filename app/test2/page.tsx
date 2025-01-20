"use client";
import { FaHistory, FaWallet } from "react-icons/fa";
import { RiTokenSwapLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";
import Swap from "./_components/swap";
import { useRouter, useSearchParams } from "next/navigation";
import Wallet from "./_components/wallet";
import History from "./_components/history";

// AppKit imports
// import ConnectButton from "./_components/appkit/connect-button";
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Suspense } from "react";

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// 1. Get projectId from https://cloud.reown.com
const projectId = "YOUR_PROJECT_ID";

const metadata = {
  name: "ArvynFi",
  description:
    "ArvynFi is a decentralized wallet designed for Solana blockchain users.",
  url: "https://arvynfi.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Create modal
createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: metadata,
  projectId,
  // features: {
  //   analytics: true // Optional - defaults to your Cloud configuration
  // }
});

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activePage = searchParams.get("page") || "wallet";

  const handleNavigation = (page: string) => {
    router.push(`/test2/?page=${page}`);
  };

  const Render = () => {
    switch (activePage) {
      case "wallet":
        return <Wallet />;
      case "swap":
        return <Swap />;
      case "history":
        return <History />;
      default:
        return <Wallet />;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col justify-between h-screen max-w-[480px] w-full mx-auto">
        <div className="w-full p-3 flex justify-between items-center">
          <TbExchange size={25} className="text-teal-600" />
          {/* <ConnectButton />*/}
        </div>
        <Render />
        <div className="flex justify-between w-full p-4 dark:bg-gray-800">
          <i
            className={`text-teal-500 px-4 ${
              activePage === "wallet" ? "text-white" : ""
            }`}
            onClick={() => handleNavigation("wallet")}
          >
            <FaWallet size={30} />
          </i>
          <i
            className={`text-teal-500 px-4 ${
              activePage === "swap" ? "text-white" : ""
            }`}
            onClick={() => handleNavigation("swap")}
          >
            <RiTokenSwapLine size={30} />
          </i>
          <i
            className={`text-teal-500 px-4 ${
              activePage === "history" ? "text-white" : ""
            }`}
            onClick={() => handleNavigation("history")}
          >
            <FaHistory size={30} />
          </i>
        </div>
      </div>
    </Suspense>
  );
}
