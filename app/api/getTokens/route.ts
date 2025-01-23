import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

type ParsedAccountInfo = {
  parsed: {
    info: {
      mint: string;
      tokenAmount: {
        uiAmount: number;
      };
    };
  };
};

// In-memory cache (with expiration)
const tokenCache: { [key: string]: { data: any; timestamp: number } } = {};
const priceCache: { [key: string]: { data: any; timestamp: number } } = {};

const CACHE_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

async function fetchTokenData(mintAddress: string) {
  // Check if the token data is cached and still valid
  if (
    tokenCache[mintAddress] &&
    Date.now() - tokenCache[mintAddress].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return tokenCache[mintAddress].data;
  }

  const token = await (
    await fetch(`https://tokens.jup.ag/token/${mintAddress}`)
  ).json();
  tokenCache[mintAddress] = { data: token, timestamp: Date.now() }; // Cache the response
  return token;
}

async function fetchPriceData(mintAddress: string) {
  // Check if the price data is cached and still valid
  if (
    priceCache[mintAddress] &&
    Date.now() - priceCache[mintAddress].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return priceCache[mintAddress].data;
  }

  const data = await (
    await fetch(`https://api.jup.ag/price/v2?ids=${mintAddress}`)
  ).json();
  const price = data.data[`${mintAddress}`].price;
  priceCache[mintAddress] = { data: price, timestamp: Date.now() }; // Cache the price
  return price;
}

export async function POST(req: NextRequest) {
  try {
    const { publicKey }: { publicKey: string } = await req.json();

    // Validate the public key
    if (!publicKey) {
      return NextResponse.json(
        { error: "Public key is required" },
        { status: 400 }
      );
    }

    const rpcEndpoint =
      "https://mainnet.helius-rpc.com/?api-key=2de169df-d4aa-4f0b-91f6-9859db329839";
    const solanaConnection = new Connection(rpcEndpoint);

    const pubKey = new PublicKey(publicKey);

    const filters = [
      {
        dataSize: 165, // Size of account (bytes)
      },
      {
        memcmp: {
          offset: 32, // Location of our query in the account (bytes)
          bytes: pubKey.toBase58(), // Our search criteria, a base58 encoded string
        },
      },
    ];

    const accounts = await solanaConnection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      { filters }
    );

    // Use Promise.all to wait for all token fetches to complete
    const SPLtokens = await Promise.all(
      accounts.map(async (account) => {
        const parsedAccountInfo = account.account.data as ParsedAccountInfo;
        const mintAddress = parsedAccountInfo.parsed.info.mint;
        const tokenBalance = parsedAccountInfo.parsed.info.tokenAmount.uiAmount;

        const token = await fetchTokenData(mintAddress);
        const price = await fetchPriceData(mintAddress);

        return {
          name: token?.name,
          img: token?.logoURI,
          symbol: token?.symbol,
          mint: mintAddress,
          tokenBalance,
          priceInUSD: tokenBalance * price,
          decimal: token?.decimals,
        };
      })
    );

    const getSolToken = async () => {
      const balance = await solanaConnection.getBalance(pubKey);

      const token = await fetchTokenData(
        "So11111111111111111111111111111111111111112"
      );
      const price = await fetchPriceData(
        "So11111111111111111111111111111111111111112"
      );

      return {
        name: token?.name,
        img: token?.logoURI,
        symbol: token?.symbol,
        mint: "So11111111111111111111111111111111111111112",
        tokenBalance: balance / LAMPORTS_PER_SOL,
        priceInUSD: (balance / LAMPORTS_PER_SOL) * price,
        decimal: token?.decimals,
      };
    };

    const sol = await getSolToken();

    const tokens = [...SPLtokens, sol];

    return NextResponse.json({ tokens });
  } catch (error) {
    console.error("Error fetching tokens:", (error as Error).message);
    return NextResponse.json(
      { error: `Failed to fetch tokens: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
