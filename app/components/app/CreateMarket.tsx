"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";

import {
  ASSET_CONFIG,
  getContractAddress,
  veyntAbi,
  type Asset,
} from "@/lib/veynt";

export default function CreateMarket({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { isConnected, chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const [asset, setAsset] = useState<Asset>("BTC");
  const [direction, setDirection] = useState<"ABOVE" | "BELOW">("ABOVE");

  const [price, setPrice] = useState(ASSET_CONFIG.BTC.defaultPrice.toString());

  const [minutes, setMinutes] = useState("5");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const updateAsset = (value: Asset) => {
    setAsset(value);
    setPrice(ASSET_CONFIG[value].defaultPrice.toString());
  };

  const preview =
    `Will the price of ${asset} be ` +
    `${direction.toLowerCase()} ` +
    `$${Number(price || 0).toLocaleString()} ` +
    `after ${minutes || 0} minutes?`;

  const create = async () => {
    try {
      if (!isConnected) {
        throw new Error("Connect your wallet first.");
      }

      if (!chain?.id) {
        throw new Error("Unable to detect your network.");
      }

      // Get the contract for the currently selected network.
      let contractAddress: `0x${string}`;

      try {
        contractAddress = getContractAddress(chain.id);
      } catch {
        throw new Error("Please switch to BOT Mainnet or BOT Testnet.");
      }

      if (!price || Number(price) <= 0) {
        throw new Error("Enter a valid target price.");
      }

      if (!minutes || Number(minutes) <= 0) {
        throw new Error("Enter a valid duration.");
      }

      if (!publicClient) {
        throw new Error("Unable to connect to the selected network.");
      }

      setBusy(true);

      /*
       * Target price is stored with 8 decimal places.
       *
       * Example:
       * 65000 → 6500000000000
       */
      const scaled = BigInt(Math.round(Number(price) * 100000000)).toString();

      /*
       * Contract question format:
       *
       * ASSET|DIRECTION|SCALED_PRICE
       */
      const question = `${asset}|${direction}|${scaled}`;

      /*
       * Round deadline to the nearest minute,
       * matching the original Veynt implementation.
       */
      const deadline = BigInt(
        Math.floor((Date.now() + Number(minutes) * 60 * 1000) / 60000) * 60,
      );

      const apiEndpoint =
        `https://data-api.binance.vision/api/v3/klines` +
        `?symbol=${ASSET_CONFIG[asset].symbol}` +
        `&interval=1m`;

      const hash = await writeContractAsync({
        address: contractAddress,
        abi: veyntAbi,
        functionName: "createMarket",
        args: [question, deadline, apiEndpoint],
        value: parseEther("1"),
      });

      await publicClient.waitForTransactionReceipt({
        hash,
      });

      onClose();

      /*
       * Do not reload the entire page.
       * The parent MarketBoard should refresh its data.
       */
      window.dispatchEvent(new CustomEvent("veynt-market-created"));
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Market creation failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#212529]/60 p-5 backdrop-blur-md">
      <div className="w-full max-w-[680px] rounded-[30px] bg-white p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7fd509]">
              New market
            </p>

            <h2 className="mt-2 text-3xl font-medium tracking-tight text-[#212529]">
              Create a market
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#6c757d]">
              Define what you want the market to predict. Creation costs 1 BOT.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-[#6c757d] transition hover:text-[#212529]"
          >
            ×
          </button>
        </div>

        {/* Selected Network */}
        <div className="mt-6 flex items-center justify-between rounded-xl bg-[#f5f5f5] px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6c757d]">
            Network
          </span>

          <span className="text-sm font-medium text-[#212529]">
            {chain?.id === 968
              ? "Bohr Testnet"
              : chain?.id === 677
                ? "BOT Mainnet"
                : "Unsupported network"}
          </span>
        </div>

        {/* Builder */}
        <div className="mt-5 rounded-[24px] bg-[#212529] p-5 text-white md:p-7">
          <div className="flex flex-wrap items-center gap-2 text-lg leading-10">
            <span>Will the price of</span>

            <select
              value={asset}
              onChange={(event) => updateAsset(event.target.value as Asset)}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium outline-none"
            >
              {Object.keys(ASSET_CONFIG).map((item) => (
                <option key={item} value={item} className="text-[#212529]">
                  {item}
                </option>
              ))}
            </select>

            <span>be</span>

            <select
              value={direction}
              onChange={(event) =>
                setDirection(event.target.value as "ABOVE" | "BELOW")
              }
              className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium outline-none"
            >
              <option value="ABOVE" className="text-[#212529]">
                above
              </option>

              <option value="BELOW" className="text-[#212529]">
                below
              </option>
            </select>

            <span>than</span>

            <div className="rounded-lg bg-white/10 px-3">
              <span className="text-white/50">$</span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-28 bg-transparent py-1.5 text-sm font-medium outline-none"
              />
            </div>

            <span>after</span>

            <div className="rounded-lg bg-white/10">
              <input
                type="number"
                min="1"
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
                className="w-16 bg-transparent px-3 py-1.5 text-sm font-medium outline-none"
              />

              <span className="pr-3 text-xs text-white/50">min</span>
            </div>

            <span>?</span>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-4 rounded-2xl bg-[#7fd509]/10 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6c757d]">
            Market preview
          </p>

          <p className="mt-2 text-sm font-medium leading-6 text-[#212529]">
            {preview}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full border border-[#e9ecef] px-5 py-3 text-sm font-medium text-[#212529] transition hover:bg-[#f5f5f5]"
          >
            Cancel
          </button>

          <button
            disabled={
              busy || !isConnected || !chain || ![968, 677].includes(chain.id)
            }
            onClick={create}
            className="rounded-full bg-[#7fd509] px-6 py-3 text-sm font-medium text-[#212529] transition hover:brightness-105 disabled:opacity-40"
          >
            {busy ? "Creating..." : "Create Market"}
          </button>
        </div>
      </div>
    </div>
  );
}
