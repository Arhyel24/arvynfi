import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import WalletUI from "./wallet-ui";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <>
      <button onClick={() => open()} className="text-white">
        {isConnected ? (
          <WalletUI address={address as string} />
        ) : (
          "Connect wallet"
        )}
      </button>
    </>
  );
}
