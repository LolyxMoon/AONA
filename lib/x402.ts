/**
 * x402 Payment Protocol Utilities for AONA
 * Implements HTTP 402 Payment Required with Solana payment verification
 */

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// Payment token configurations
export const PAYMENT_TOKENS = {
  SOL: {
    mint: null, // Native SOL
    decimals: 9,
    symbol: "SOL",
  },
  USDC: {
    mint: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"), // USDC devnet
    decimals: 6,
    symbol: "USDC",
  },
} as const;

export type PaymentToken = keyof typeof PAYMENT_TOKENS;

// x402 HTTP Headers
export interface X402Headers {
  "402-Price": string; // Amount in lamports or smallest token unit
  "402-Accept-Method": string; // "solana-native" or "solana-spl"
  "402-Payment-Address": string; // Recipient wallet address
  "402-Token": string; // Token symbol (SOL, USDC, etc.)
  "402-Network": string; // "devnet" or "mainnet-beta"
}

// Payment verification result
export interface PaymentVerification {
  valid: boolean;
  amount: number;
  recipient: string;
  signature: string;
  token: PaymentToken;
  timestamp: number;
  error?: string;
}

/**
 * Get Solana connection for the appropriate network
 */
export function getConnection(network: "devnet" | "mainnet-beta" = "devnet"): Connection {
  const rpcUrl =
    network === "devnet"
      ? process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com"
      : "https://api.mainnet-beta.solana.com";

  return new Connection(rpcUrl, "confirmed");
}

/**
 * Generate x402 payment request headers
 */
export function generatePaymentRequest(
  nodeAddress: string,
  priceInLamports: number,
  token: PaymentToken = "SOL",
  network: "devnet" | "mainnet-beta" = "devnet"
): X402Headers {
  return {
    "402-Price": priceInLamports.toString(),
    "402-Accept-Method": token === "SOL" ? "solana-native" : "solana-spl",
    "402-Payment-Address": nodeAddress,
    "402-Token": token,
    "402-Network": network,
  };
}

/**
 * Verify a Solana payment transaction
 * @param signature - Transaction signature from X-Payment header
 * @param expectedAmount - Expected payment amount in smallest unit
 * @param recipient - Expected recipient address
 * @param token - Expected payment token (SOL or USDC)
 * @returns PaymentVerification result
 */
export async function verifyPayment(
  signature: string,
  expectedAmount: number,
  recipient: string,
  token: PaymentToken = "SOL"
): Promise<PaymentVerification> {
  const connection = getConnection();

  try {
    // Fetch transaction
    const tx = await connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed",
    });

    if (!tx) {
      return {
        valid: false,
        amount: 0,
        recipient,
        signature,
        token,
        timestamp: Date.now(),
        error: "Transaction not found",
      };
    }

    // Extract recipient pubkey
    const recipientPubkey = new PublicKey(recipient);

    let actualAmount = 0;
    let validTransfer = false;

    if (token === "SOL") {
      // Verify native SOL transfer
      const preBalance = tx.meta?.preBalances[1] || 0;
      const postBalance = tx.meta?.postBalances[1] || 0;
      actualAmount = postBalance - preBalance;

      // Check if recipient received the payment
      const accountKeys = tx.transaction.message.staticAccountKeys || [];
      validTransfer = accountKeys.some((key) => key.equals(recipientPubkey));
    } else {
      // Verify SPL token transfer
      const tokenMint = PAYMENT_TOKENS[token].mint;
      if (!tokenMint) {
        return {
          valid: false,
          amount: 0,
          recipient,
          signature,
          token,
          timestamp: Date.now(),
          error: "Token mint not configured",
        };
      }

      // Parse token transfer instructions
      const tokenTransfers = tx.meta?.postTokenBalances || [];
      for (const transfer of tokenTransfers) {
        if (
          transfer.owner === recipient &&
          transfer.mint === tokenMint.toBase58()
        ) {
          actualAmount = Number(transfer.uiTokenAmount.amount);
          validTransfer = true;
          break;
        }
      }
    }

    // Validate amount (allow 1% tolerance for fees)
    const minAmount = expectedAmount * 0.99;
    const amountValid = actualAmount >= minAmount;

    return {
      valid: validTransfer && amountValid,
      amount: actualAmount,
      recipient,
      signature,
      token,
      timestamp: Date.now(),
      error: !validTransfer
        ? "Invalid recipient"
        : !amountValid
        ? `Amount too low: ${actualAmount} < ${expectedAmount}`
        : undefined,
    };
  } catch (error) {
    return {
      valid: false,
      amount: 0,
      recipient,
      signature,
      token,
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Calculate price for a node based on reputation
 * Higher reputation = slightly higher price (premium for quality)
 */
export function calculateNodePrice(reputationScore: number): number {
  // Base price: 0.001 SOL (1_000_000 lamports)
  const basePrice = 0.001 * LAMPORTS_PER_SOL;

  // Premium multiplier based on reputation (0-100 scale)
  // Bronze (0-25): 1.0x
  // Silver (25-50): 1.1x
  // Gold (50-75): 1.2x
  // Platinum (75-100): 1.5x
  let multiplier = 1.0;
  if (reputationScore >= 75) multiplier = 1.5;
  else if (reputationScore >= 50) multiplier = 1.2;
  else if (reputationScore >= 25) multiplier = 1.1;

  return Math.floor(basePrice * multiplier);
}

/**
 * Transfer payment to node (90% to node, 10% protocol fee)
 * Note: This would be implemented on-chain in production
 * For hackathon, we document the split but don't enforce it
 */
export function calculatePaymentSplit(amount: number): {
  nodeAmount: number;
  protocolFee: number;
} {
  const protocolFee = Math.floor(amount * 0.1);
  const nodeAmount = amount - protocolFee;

  return { nodeAmount, protocolFee };
}

/**
 * Convert lamports to USD using Switchboard oracle price
 */
export async function lamportsToUSD(
  lamports: number,
  solPriceUSD: number
): Promise<number> {
  const sol = lamports / LAMPORTS_PER_SOL;
  return sol * solPriceUSD;
}

/**
 * Convert USDC smallest units to USD
 */
export function usdcToUSD(usdcAmount: number): number {
  return usdcAmount / Math.pow(10, PAYMENT_TOKENS.USDC.decimals);
}
