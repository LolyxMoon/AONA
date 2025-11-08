"use client";

import dynamic from "next/dynamic";

// Import dinámico para evitar cualquier lío de SSR
const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function WalletButton() {
  return <WalletMultiButton className="!rounded-xl" />;
}
