import Link from "next/link";
import { IoEllipsisHorizontalCircleSharp } from "react-icons/io5";

export default function Wallet() {
  return (
    <div className="flex flex-col bg-cover bg-center flex-1">
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
          <h1 className="text-5xl font-bold text-white">$17.57</h1>
          <div className="flex justify-center mt-2">
            <span className="text-green-500 mr-2">+2.31</span>
            <span className="text-green-500">+15.13%</span>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full px-4">
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40?text=Solana"
              alt="Solana logo"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Solana</h2>
              <div className="flex items-center">
                <span className="text-gray-400">$256.36</span>
                <span className="text-green-500 ml-2">+16.36%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">$16.06</h2>
            <span className="text-gray-400">0.06266 SOL</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40?text=KIN"
              alt="KIN logo"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">KIN</h2>
              <div className="flex items-center">
                <span className="text-gray-400">$0.00001</span>
                <span className="text-green-500 ml-2">+6.10%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">$0.89</h2>
            <span className="text-gray-400">71,288 KIN</span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40?text=USD+Coin"
              alt="USD Coin logo"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">USD Coin</h2>
              <div className="flex items-center">
                <span className="text-gray-400">$1.00</span>
                <span className="text-gray-400 ml-2">0.00%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">$0.62</h2>
            <span className="text-gray-400">0.62017 USDC</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-gray-400">
        <Link href={"#"} className="flex justify-center items-center gap-2">
          <IoEllipsisHorizontalCircleSharp /> Manage tokens
        </Link>
      </div>
    </div>
  );
}
