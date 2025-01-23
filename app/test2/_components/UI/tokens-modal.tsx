import myImageLoader from "@/actions/image/loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TokenInfo } from "../../main-component";

export default function VerifiedTokensModal({
  isOpen,
  onClose,
  handleOutTokenSelect,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  handleOutTokenSelect(token: any): void;
}) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]); // All tokens fetched
  const [visibleTokens, setVisibleTokens] = useState<TokenInfo[]>([]); // Tokens currently displayed
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([]); // Tokens filtered by search
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Pagination
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  const BATCH_SIZE = 20; // Number of tokens per batch

  // Fetch tokens from the API when the modal is open
  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://tokens.jup.ag/tokens?tags=verified"
        );
        const data = await response.json();

        // Transform API response to match TokenInfo type
        const transformedTokens: TokenInfo[] = data.map((token: any) => ({
          name: token.name,
          img: token.logoURI,
          symbol: token.symbol,
          mint: token.address,
          decimal: token.decimals,
        }));

        setTokens(transformedTokens);
        setFilteredTokens(transformedTokens); // Default filtered tokens to all tokens
        setVisibleTokens(transformedTokens.slice(0, BATCH_SIZE));
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchTokens();
  }, [isOpen]);

  // Filter tokens based on the search query
  useEffect(() => {
    const filtered = tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
    setVisibleTokens(filtered.slice(0, BATCH_SIZE));
    setPage(1); // Reset pagination
  }, [searchQuery, tokens]);

  // Load more tokens when scrolling to the bottom
  const loadMoreTokens = () => {
    const nextPage = page + 1;
    const nextBatch = filteredTokens.slice(
      page * BATCH_SIZE,
      nextPage * BATCH_SIZE
    );
    setVisibleTokens((prev) => [...prev, ...nextBatch]);
    setPage(nextPage);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-800 transition-transform duration-300 transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      } p-4 rounded-t-lg`}
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-white">Select Out Token</h3>
        <button className="text-gray-400" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a token..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tokens List */}
      <div
        className="space-y-4 overflow-y-auto"
        style={{ maxHeight: "calc(90vh - 140px)" }}
        onScroll={(e: any) => {
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
            loadMoreTokens();
          }
        }}
      >
        {visibleTokens.map((token, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => handleOutTokenSelect(token)}
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
        {loading && <div className="text-center py-4">Loading...</div>}
        {!loading && visibleTokens.length === 0 && (
          <div className="text-center py-4 text-gray-400">No tokens found</div>
        )}
      </div>
    </div>
  );
}
