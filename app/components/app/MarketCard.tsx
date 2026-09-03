"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  usePublicClient,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

import { getContractAddress, veyntAbi } from "@/lib/veynt";
import ResolveMarket from "./ResolveMarket";
import type { Market } from "./MarketBoard";

function formatQuestion(question: string) {
  const parts = question.split("|");

  if (parts.length !== 3) {
    return question;
  }

  const asset = parts[0];
  const direction = parts[1].toLowerCase();
  const price = Number(parts[2]) / 1e8;

  return `Will the price of ${asset} be ${direction} $${price.toLocaleString()}?`;
}

function getRemaining(deadline: bigint) {
  const remaining = Number(deadline) * 1000 - Date.now();

  if (remaining <= 0) {
    return "Deadline passed";
  }

  let seconds = Math.floor(remaining / 1000);

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  return `${minutes}m ${seconds}s remaining`;
}

export default function MarketCard({
  market,
  onRefresh,
}: {
  market: Market;
  onRefresh: () => void;
}) {
  const { address, isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const publicClient = usePublicClient();

  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);

  const passed = Number(market.deadline) * 1000 <= Date.now();

  const getAddress = () => {
    if (!chain?.id) {
      throw new Error("Please connect your wallet.");
    }

    return getContractAddress(chain.id);
  };

  const ensureChain = async () => {
    if (!isConnected) {
      throw new Error("Connect your wallet first.");
    }

    if (!chain?.id) {
      throw new Error("Unable to detect your network.");
    }

    try {
      getContractAddress(chain.id);
    } catch {
      throw new Error("Please switch to BOT Mainnet or BOT Testnet.");
    }
  };

  const predict = async (choice: "YES" | "NO") => {
    try {
      if (!amount || Number(amount) <= 0) {
        throw new Error("Enter a BOT amount first.");
      }

      await ensureChain();

      if (!publicClient) {
        throw new Error("Unable to connect to the selected network.");
      }

      setBusy(true);

      const contractAddress = getAddress();

      const encrypted = await encryptPrediction(choice);

      const hash = await writeContractAsync({
        address: contractAddress,
        abi: veyntAbi,
        functionName: "predict",
        args: [market.id, encrypted],
        value: parseEther(amount),
      });

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      setAmount("");

      await onRefresh();
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Prediction failed.");
    } finally {
      setBusy(false);
    }
  };

  const claim = async () => {
    if (!address) return;

    try {
      setBusy(true);

      await ensureChain();

      if (!publicClient) {
        throw new Error("Unable to connect to the selected network.");
      }

      const contractAddress = getAddress();

      const response = await fetch(
        `https://raw.githubusercontent.com/Pandey456/VEYNT/main/veyntmarket-tee/payouts/market-${market.id}.json?t=${Date.now()}`,
      );

      if (!response.ok) {
        throw new Error("Payout data is not published yet.");
      }

      const data = await response.json();

      const winner = data.winners?.find(
        (item: { bettor: string }) =>
          item.bettor.toLowerCase() === address.toLowerCase(),
      );

      if (!winner) {
        throw new Error("No winning payout belongs to this wallet.");
      }

      const alreadyClaimed = await publicClient.readContract({
        address: contractAddress,
        abi: veyntAbi,
        functionName: "hasClaimed",
        args: [market.id, address],
      });

      if (alreadyClaimed) {
        throw new Error("Already claimed.");
      }

      const hash = await writeContractAsync({
        address: contractAddress,
        abi: veyntAbi,
        functionName: "claimPayout",
        args: [market.id, BigInt(winner.payout), winner.proof || []],
      });

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      await onRefresh();
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Claim failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="group rounded-[28px] border border-[#e9ecef] bg-white p-6 shadow-[0_15px_50px_rgba(33,37,41,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(33,37,41,0.1)] md:p-7">
      {/* Top */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#6c757d]">
          Market #{market.id.toString()}
        </span>

        {market.resolved ? (
          <span className="rounded-full bg-[#212529] px-3 py-1.5 text-[10px] font-medium text-white">
            RESOLVED · {market.outcome ? "YES" : "NO"}
          </span>
        ) : passed ? (
          <span className="rounded-full bg-[#f1f2f3] px-3 py-1.5 text-[10px] font-medium text-[#212529]">
            DEADLINE PASSED
          </span>
        ) : (
          <span className="rounded-full bg-[#7fd509]/10 px-3 py-1.5 text-[10px] font-medium text-[#212529]">
            LIVE
          </span>
        )}
      </div>

      {/* Question */}
      <h3 className="mt-7 max-w-xl text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[#212529]">
        {formatQuestion(market.question)}
      </h3>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-2">
        <Stat label="Pool" value={`${formatEther(market.totalPool)} BOT`} />

        <Stat
          label="Deadline"
          value={new Date(Number(market.deadline) * 1000).toLocaleDateString()}
        />

        <Stat
          label="Result"
          value={market.resolved ? (market.outcome ? "YES" : "NO") : "Pending"}
        />
      </div>

      {/* Status */}
      <div className="mt-5 text-xs text-[#6c757d]">
        {market.resolved ? "Market resolved." : getRemaining(market.deadline)}
      </div>

      {/* Prediction */}
      {!market.resolved && !passed && (
        <div className="mt-6">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Amount in BOT"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-xl border border-[#e9ecef] bg-[#f8f9f9] px-4 py-3.5 text-sm text-[#212529] placeholder:text-[#6c757d] outline-none transition focus:border-[#7fd509]"
          />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              disabled={busy}
              onClick={() => predict("YES")}
              className="rounded-xl bg-[#7fd509] px-4 py-3.5 text-sm font-medium text-[#212529] transition hover:brightness-105 disabled:opacity-40"
            >
              {busy ? "Processing..." : "Predict YES"}
            </button>

            <button
              disabled={busy}
              onClick={() => predict("NO")}
              className="rounded-xl bg-[#212529] px-4 py-3.5 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-40"
            >
              {busy ? "Processing..." : "Predict NO"}
            </button>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-[#6c757d]">
            Your prediction is encrypted before it is submitted on-chain.
          </p>
        </div>
      )}

      {/* Claim */}
      {market.resolved && (
        <button
          disabled={busy}
          onClick={claim}
          className="mt-6 w-full rounded-xl bg-[#7fd509] px-4 py-3.5 text-sm font-medium text-[#212529] transition hover:brightness-105 disabled:opacity-40"
        >
          {busy ? "Claiming..." : "Claim Winnings"}
        </button>
      )}

      {/* Deadline */}
      {!market.resolved && passed && (
        <div className="mt-6 rounded-xl bg-[#f8f9f9] p-4">
          <p className="text-xs leading-5 text-[#6c757d]">
            This market has reached its deadline and is ready for resolution.
          </p>

          <button
            disabled={busy}
            onClick={() => setResolveOpen(true)}
            className="mt-3 w-full rounded-xl border border-[#212529] px-4 py-3 text-sm font-medium text-[#212529] transition hover:bg-[#212529] hover:text-white disabled:opacity-40"
          >
            Resolve Market
          </button>
        </div>
      )}
      <ResolveMarket
        open={resolveOpen}
        marketId={market.id}
        onClose={() => setResolveOpen(false)}
        onResolved={onRefresh}
      />
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f5f5f5] p-4">
      <span className="block text-[10px] font-medium uppercase tracking-wider text-[#6c757d]">
        {label}
      </span>

      <strong className="mt-2 block truncate text-sm font-medium text-[#212529]">
        {value}
      </strong>
    </div>
  );
}

async function encryptPrediction(prediction: "YES" | "NO") {
  const { PREDICTION_PUBLIC_KEY } = await import("@/lib/veynt");

  const pem = PREDICTION_PUBLIC_KEY.replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s/g, "");

  const binary = atob(pem);

  const keyBytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    keyBytes[i] = binary.charCodeAt(i);
  }

  const publicKey = await crypto.subtle.importKey(
    "spki",
    keyBytes.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"],
  );

  const plaintext = new TextEncoder().encode(prediction);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    plaintext,
  );

  return ("0x" +
    Array.from(new Uint8Array(encrypted))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")) as `0x${string}`;
}
