"use client";
import Image from "next/image";
import Link from "next/link";
import { IoEllipsisHorizontalCircleSharp } from "react-icons/io5";
import { TokenInfo } from "../main-component";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { GetAllTokens } from "@/actions/getAllTokens";
import myImageLoader from "@/actions/image/loader";
import TokenDetailsModal from "./UI/token-details";

export type TokenArray = TokenInfo[];

// Cache expiration time (in milliseconds)
export const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes

export default function Wallet() {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [selectedTokenMint, setSelectedTokenMint] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address, isConnected } = useAppKitAccount();

  const getCachedTokens = () => {
    const cachedData = localStorage.getItem("tokens");
    if (cachedData) {
      const { tokens, timestamp } = JSON.parse(cachedData);
      const isCacheExpired = Date.now() - timestamp > CACHE_EXPIRATION_TIME;

      // If the cache is expired, return null to fetch new data
      if (isCacheExpired) {
        return null;
      }

      return tokens; // Return cached tokens if they are not expired
    }
    return null; // No cached data
  };

  const handleTokenClick = (mint: string) => {
    setSelectedTokenMint(mint);
    setIsModalOpen(true);
  };

  // Get cached total balance from localStorage
  const getCachedBalance = () => {
    const cachedData = localStorage.getItem("totalBalance");
    if (cachedData) {
      const { balance, timestamp } = JSON.parse(cachedData);
      const isCacheExpired = Date.now() - timestamp > CACHE_EXPIRATION_TIME;

      // If the cache is expired, return null to calculate again
      if (isCacheExpired) {
        return null;
      }

      return balance; // Return cached balance if not expired
    }
    return null; // No cached data
  };

  // Store tokens and balance with timestamp in localStorage
  const storeCache = (tokens: TokenArray, totalBalance: number) => {
    const timestamp = Date.now();
    localStorage.setItem("tokens", JSON.stringify({ tokens, timestamp }));
    localStorage.setItem(
      "totalBalance",
      JSON.stringify({ balance: totalBalance, timestamp })
    );
  };

  const calculateTotalBalance = (tokenData: TokenArray) => {
    const total = tokenData
      .filter((token) => token) // Exclude null or undefined tokens
      .reduce((acc, token) => acc + (token.priceInUSD || 0), 0);
    setTotalBalance(total);
    storeCache(tokenData, total); // Cache the tokens and balance with timestamp
  };

  useEffect(() => {
    const fetchTokens = async () => {
      if (isConnected) {
        // First, check for cached data
        const cachedTokens = getCachedTokens();
        const cachedBalance = getCachedBalance();

        if (cachedTokens && cachedBalance !== null) {
          // Use cached data if available
          setTokens(cachedTokens);
          setTotalBalance(cachedBalance);
        } else {
          // Fetch new data if no valid cache is available
          const tokens = await GetAllTokens(address!);
          setTokens(tokens);
          calculateTotalBalance(tokens);
        }
      }
    };

    fetchTokens();
  }, [isConnected, address]);

  return (
    <div className="flex flex-col bg-cover bg-center flex-1">
      {/* Wallet Header */}
      <div
        className="relative text-center h-[30%] flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/solana-coin.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white">
            ${totalBalance.toFixed(2)}
          </h1>
          <div className="flex justify-center mt-2">
            <span className="text-green-500 mr-2">+2.31</span>
            <span className="text-green-500">+15.13%</span>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div className="max-h-[400px] mt-5 w-full px-4 overflow-y-auto">
        {tokens.length > 0 ? (
          tokens
            .filter((token) => token)
            .sort((a, b) => (b.priceInUSD || 0) - (a.priceInUSD || 0))
            .map((token: TokenInfo, index: number) => (
              <div
                key={index}
                className="te p-4 rounded-lg flex justify-between items-center mb-4"
                onClick={() => handleTokenClick(token.mint)}
              >
                <div className="flex items-center">
                  <Image
                    loader={myImageLoader}
                    quality={75}
                    height={40}
                    width={40}
                    src={token.img}
                    alt={token.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{token.name}</h2>
                    <div className="flex items-center">
                      <span className="text-gray-400">$256.36</span>
                      <span className="text-green-500 ml-2">+16.36%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-semibold">
                    ${token.priceInUSD.toFixed(2)}
                  </h2>
                  <span className="text-gray-400">{token.tokenBalance}</span>
                </div>
              </div>
            ))
        ) : (
          <p className="text-white text-center">No tokens found</p>
        )}
      </div>
      {isModalOpen && selectedTokenMint && (
        <TokenDetailsModal
          isOpen={isModalOpen}
          mintAddress={selectedTokenMint}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Footer Link */}
      <div className="mt-4 text-gray-400">
        <Link href={"#"} className="flex justify-center items-center gap-2">
          <IoEllipsisHorizontalCircleSharp /> Manage tokens
        </Link>
      </div>
    </div>
  );
}
