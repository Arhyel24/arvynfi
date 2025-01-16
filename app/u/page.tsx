"use client";

import { useState } from "react";
import { Dashboard } from "./_components/dashboard";

export default function Header() {
  const [state, setState] = useState("dashboard");

  //   const Render = () => {
  //     switch (state) {
  //       case "dashboard":
  //         return <Dashboard />;
  //       case "swap":
  //         return <Swap />;
  //       case "send":
  //         return <Send />;
  //       case "history":
  //         return <History />;
  //       default:
  //         return <Dashboard />;
  //     }
  //   };

  return (
    <div className="max-w-[480px] w-full mx-auto h-screen px-4">
      <div className="flex justify-between py-4">
        <h1>ArvynFi</h1>
        <button>Connect wallet</button>
      </div>
      <div className="w-full p-2 flex justify-center items-center gap-2 pb-4">
        <button
          onClick={() => setState("dashboard")}
          className={`p-2 rounded-full  hover:bg-white hover:text-blue-950 ${
            state === "dashboard"
              ? "bg-white text-blue-950"
              : "bg-blue-950 text-white"
          } text-xs text-white`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setState("swap")}
          className={`p-2 rounded-full  hover:bg-white hover:text-blue-950 ${
            state === "swap"
              ? "bg-white text-blue-950"
              : "bg-blue-950 text-white"
          } text-xs text-white`}
        >
          Swap
        </button>
        <button
          onClick={() => setState("send")}
          className={`p-2 rounded-full  hover:bg-white hover:text-blue-950 ${
            state === "send"
              ? "bg-white text-blue-950"
              : "bg-blue-950 text-white"
          } text-xs text-white`}
        >
          Send Tokens
        </button>
        <button
          onClick={() => setState("history")}
          className={`p-2 rounded-full  hover:bg-white hover:text-blue-950 ${
            state === "history"
              ? "bg-white text-blue-950"
              : "bg-blue-950 text-white"
          } text-xs text-white`}
        >
          History
        </button>
      </div>
      <div className="p-2 rounded-md flex flex-col gap-4">
        <Dashboard />
      </div>
    </div>
  );
}
