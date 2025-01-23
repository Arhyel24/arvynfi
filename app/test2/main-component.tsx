"use client";

import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { RiTokenSwapLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";
import Swap from "./_components/swap";
import { useRouter, useSearchParams } from "next/navigation";
import Wallet from "./_components/wallet";
import History from "./_components/history";

import ConnectButton from "./_components/appkit/connect-button";

export type TokenInfo = {
  name: string;
  img: string;
  symbol: string;
  mint: string;
  tokenBalance: number;
  priceInUSD: number;
  decimal: number;
};

export default function Navigation() {
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
    <div className="flex flex-col justify-between h-screen max-w-[480px] w-full mx-auto">
      <div className="w-full p-3 flex justify-between items-center">
        <TbExchange size={25} className="text-teal-600" />
        <div className="text-white">
          <ConnectButton />
        </div>
      </div>
      <Render />
      <div className="flex justify-evenly w-full p-4 dark:bg-gray-800">
        <i
          className={`text-teal-500 px-4 ${
            activePage === "wallet" ? "text-white" : ""
          }`}
          onClick={() => handleNavigation("wallet")}
        >
          <FaWallet size={25} />
        </i>
        <i
          className={`text-teal-500 px-4 ${
            activePage === "swap" ? "text-white" : ""
          }`}
          onClick={() => handleNavigation("swap")}
        >
          <RiTokenSwapLine size={25} />
        </i>
        {/* <i
          className={`text-teal-500 px-4 ${
            activePage === "history" ? "text-white" : ""
          }`}
          onClick={() => handleNavigation("history")}
        >
          <FaHistory size={25} />
        </i> */}
      </div>
    </div>
  );
}
