"use client";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { type Provider } from "@reown/appkit-adapter-solana/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { VersionedTransaction } from "@solana/web3.js";
import { TokenInfo } from "../main-component";
import { GetAllTokens } from "@/actions/getAllTokens";
import { CACHE_EXPIRATION_TIME, TokenArray } from "./wallet";
import myImageLoader from "@/actions/image/loader";
import VerifiedTokensModal from "./UI/tokens-modal";

export default function Swap() {
  const [amount, setAmount] = useState("0");
  const [quote, setQuote] = useState(0);
  const [quoteResponse, setQuoteResponse] = useState();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOutModalOpen, setIsOutModalOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenInfo>({
    name: "USD Coin",
    symbol: "USDC",
    img: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    tokenBalance: 0,
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimal: 6,
    priceInUSD: 23.4,
  });

  const [outToken, setOutToken] = useState({
    name: "Solana",
    symbol: "SOL",
    img: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    tokenBalance: 0,
    mint: "So11111111111111111111111111111111111111112",
    decimal: 9,
    priceInUSD: 23.4,
  });

  const closeOutModal = () => setIsOutModalOpen(false);

  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const getQuote = async (amount: Number) => {
    const quoteResponse = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${selectedToken.mint}\
&outputMint=${outToken.mint}\
&amount=${amount}\
&slippageBps=50`
      )
    ).json();
    setQuote(quoteResponse.outAmount / 10 ** outToken.decimal);
    setQuoteResponse(quoteResponse);
  };

  const confirmSwap = async () => {
    if (!isConnected) {
      setError("Please connect to your wallet");
      return;
    }
    // get serialized transactions for the swap
    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: address!.toString(),
          wrapAndUnwrapSol: true,
        }),
      })
    ).json();

    // deserialize the transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    const txid = await walletProvider.signAndSendTransaction(transaction);

    console.log(`https://solscan.io/tx/${txid}`);
  };

  useEffect(() => {
    if (amount !== "0" && parseFloat(amount) > 0) {
      getQuote(parseFloat(amount) * 10 ** selectedToken.decimal);
    }
  }, [amount, outToken]);

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

  // Store tokens and balance with timestamp in localStorage
  const storeCache = (tokens: TokenArray) => {
    const timestamp = Date.now();
    localStorage.setItem("tokens", JSON.stringify({ tokens, timestamp }));
  };

  useEffect(() => {
    const fetchTokens = async () => {
      if (isConnected) {
        const cachedTokens = getCachedTokens();

        if (cachedTokens) {
          setTokens(cachedTokens);
        } else {
          const tokens = await GetAllTokens(address!);
          setTokens(tokens);
          setSelectedToken(tokens[0]);
          storeCache(tokens);
        }
      }
    };

    fetchTokens();
  }, [isConnected, address]);

  const handleButtonClick = (value: string) => {
    if (value === "CLEAR") {
      setAmount("0");
    } else if (value === "BACKSPACE") {
      setAmount((prevValue) =>
        prevValue.length > 1 ? prevValue.slice(0, -1) : "0"
      );
    } else if (value === "MAX") {
      setAmount(selectedToken.tokenBalance.toString());
    } else if (value === "75") {
      setAmount((selectedToken.tokenBalance * 0.75).toFixed(2));
    } else if (value === "50") {
      setAmount((selectedToken.tokenBalance * 0.5).toFixed(2));
    } else if (value === ".") {
      if (!amount.includes(".")) {
        setAmount((prevValue) => prevValue + ".");
      }
    } else {
      setAmount((prevValue) => {
        if (prevValue === "0" && value === ".") {
          return "0.";
        } else if (prevValue === "0" && value === "0") {
          return "0.0";
        } else if (prevValue === "0") {
          return value;
        }
        return prevValue + value;
      });
    }
  };

  const handleTokenSelect = (token: any) => {
    setSelectedToken(token);
    setIsModalOpen(false);
  };

  const handleOutTokenSelect = (token: any) => {
    setOutToken(token);
    setIsOutModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center p-4 space-y-4">
        <div className="w-full dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <div
            className="flex justify-between items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center space-x-2">
              <Image
                loader={myImageLoader}
                quality={75}
                height={8}
                width={8}
                src={selectedToken.img}
                alt="USD Coin logo"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p>{selectedToken.name}</p>
                <p className="text-gray-400 text-sm">
                  {selectedToken.tokenBalance} {selectedToken.symbol}
                </p>
              </div>
            </div>
            <i className="fas fa-exchange-alt text-gray-400"></i>
          </div>
          <div className="text-center">
            <p className="text-2xl">{amount}</p>
            <p className="text-gray-400">$0.00</p>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="w-full bg-gray-800 p-4 rounded-lg space-y-2">
          <div
            className="flex justify-between items-center"
            onClick={() => setIsOutModalOpen(true)}
          >
            <div className="flex items-center space-x-2">
              <Image
                loader={myImageLoader}
                quality={75}
                height={8}
                width={8}
                src={outToken.img}
                alt={outToken.name + "logo"}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p>{outToken.name}</p>
                <p className="text-gray-400 text-sm">
                  {quote} {outToken.symbol}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-4 space-y-4">
        <button
          className="w-[90%] bg-teal-500 p-4 rounded-lg text-center mx-auto disabled:bg-teal-500"
          onClick={confirmSwap}
          disabled={quote <= 0}
        >
          {quote > 0 ? "Confirm Swap" : "Enter Amount"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-4 gap-0 w-full max-w-sm">
          {[
            { label: "MAX", value: "MAX" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "75%", value: "75" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "50%", value: "50" },
            { label: "7", value: "7" },
            { label: "8", value: "8" },
            { label: "9", value: "9" },
            { label: "CLEAR", value: "CLEAR" },
            { label: ".", value: "." },
            { label: "0", value: "0" },
            { label: <FaBackspace />, value: "BACKSPACE" },
          ].map((btn, idx) => (
            <button
              key={idx}
              className="bg-gray-800 p-4 rounded-none flex justify-center items-center"
              onClick={() => handleButtonClick(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-800 transition-transform duration-300 transform ${
          isModalOpen ? "translate-y-0" : "translate-y-full"
        } p-4 rounded-t-lg`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-white">Select In Token</h3>
          <button
            className="text-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="space-y-4">
          {tokens.map((token, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex items-center space-x-2">
                <Image
                  loader={myImageLoader}
                  quality={75}
                  src={token.img}
                  alt={`${token.name} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p>{token.name}</p>
                  <p className="text-gray-400 text-sm">
                    {token.tokenBalance} {token.symbol}
                  </p>
                </div>
              </div>
              <p className="text-white">{token.symbol}</p>
            </div>
          ))}
        </div>
      </div>
      <VerifiedTokensModal
        isOpen={isOutModalOpen}
        onClose={closeOutModal}
        handleOutTokenSelect={handleOutTokenSelect}
      />
    </>
  );
}
