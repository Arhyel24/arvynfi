import { useEffect, useState } from "react";
import Image from "next/image";
import myImageLoader from "@/actions/image/loader";

interface TokenDetails {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
  created_at: string;
  extensions: {
    coingeckoId: string;
  };
}

export default function TokenDetailsModal({
  isOpen,
  mintAddress,
  onClose,
}: {
  isOpen: boolean;
  mintAddress: string;
  onClose: VoidFunction;
}) {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!mintAddress) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://tokens.jup.ag/token/${mintAddress}`
        );
        const data = await response.json();
        setTokenDetails(data);
      } catch (error) {
        console.error("Error fetching token details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchTokenDetails();
  }, [isOpen, mintAddress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-80 flex items-center justify-center">
      <div className="bg-gray-800 w-full max-w-3xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : tokenDetails ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                loader={myImageLoader}
                quality={75}
                src={tokenDetails.logoURI}
                alt={`${tokenDetails.name} logo`}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{tokenDetails.name}</h2>
                <p className="text-gray-500">{tokenDetails.symbol}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Decimals</h3>
                <p>{tokenDetails.decimals}</p>
              </div>
              <div>
                <h3 className="font-semibold">Daily Volume</h3>
                <p>{tokenDetails.daily_volume.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Created At</h3>
                <p>{new Date(tokenDetails.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Tags</h3>
                <p>{tokenDetails.tags.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold">Coingecko ID</h3>
                <p>{tokenDetails.extensions.coingeckoId}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">No token details found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
