import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
  useAppKitState,
  useAppKitTheme,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// Create modal
const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: {
    name: "ArvynFi",
    description:
      "ArvynFi is a decentralized wallet designed for Solana blockchain users.",
    url: "https://arvynfi.vercel.app", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
  },
  projectId,
  themeMode: "dark",
//   features: {
//     analytics: true,
//   },
});

export {
  modal,
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect,
};
