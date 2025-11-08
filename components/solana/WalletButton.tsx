"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletButton() {
  const [mounted, setMounted] = useState(false);
  const { connect, disconnect, connecting } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita el hydration mismatch
  if (!mounted) {
    return (
      <div className="wallet-adapter-button-trigger-wrapper">
        <button
          disabled
          className="wallet-adapter-button wallet-adapter-button-trigger"
          style={{ pointerEvents: "none", opacity: 0.6 }}
        >
          Loading...
        </button>
      </div>
    );
  }

  return <WalletMultiButton />;
}