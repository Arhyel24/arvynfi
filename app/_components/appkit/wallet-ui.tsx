export default function WalletUI({ address }: { address: string }) {
  const trimmedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <span className="text-gray-500 cursor-pointer">
      Wallet ({trimmedAddress})
    </span>
  );
}
