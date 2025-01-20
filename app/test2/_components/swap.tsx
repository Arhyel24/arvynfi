"use client";
import { useState } from "react";
import { FaBackspace } from "react-icons/fa";

export default function Swap() {
  const [amount, setAmount] = useState("");
  const coinAmount = 2345.065;

  const handleButtonClick = (value: string) => {
    if (value === "CLEAR") {
      setAmount("0");
    } else if (value === "BACKSPACE") {
      setAmount((prevValue) =>
        prevValue.length > 1 ? prevValue.slice(0, -1) : "0"
      );
    } else if (value === "MAX") {
      setAmount(coinAmount.toString());
    } else if (value === "75") {
      setAmount((coinAmount * 0.75).toFixed(2));
    } else if (value === "50") {
      setAmount((coinAmount * 0.5).toFixed(2));
    } else if (value === ".") {
      if (!amount.includes(".")) {
        setAmount((prevValue) => prevValue + ".");
      }
    } else {
      setAmount((prevValue) => {
        if (prevValue === "0" && value !== ".") {
          return `0.${value}`;
        }
        return prevValue + value;
      });
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center p-4 space-y-4">
        <div className="w-full dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/32x32"
                alt="USD Coin logo"
                className="w-8 h-8"
              />
              <div>
                <p>USD Coin</p>
                <p className="text-gray-400 text-sm">{coinAmount} USDC</p>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/32x32"
                alt="Solana logo"
                className="w-8 h-8"
              />
              <div>
                <p>Solana</p>
                <p className="text-gray-400 text-sm">0.062660677 SOL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-4 space-y-4">
        <div className="w-[90%] bg-teal-500 p-4 rounded-lg text-center mx-auto">
          Enter Amount
        </div>
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
    </>
  );
}
