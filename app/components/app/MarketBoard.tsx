"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import type { Address } from "viem";

import { getContractAddress, veyntAbi } from "@/lib/veynt";

import MarketCard from "./MarketCard";

export type Market = {
  id: bigint;
  owner: Address;
  apiEndpoint: string;
  question: string;
  deadline: bigint;
  totalPool: bigint;
  resolved: boolean;
  outcome: boolean;
  merkleRoot: string;
  refundInitiated: boolean;
  startTime: bigint;
};

const ZERO = "0x0000000000000000000000000000000000000000";

export default function MarketBoard() {
  const { chain } = useAccount();
  const publicClient = usePublicClient();

  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMarkets = useCallback(async () => {
    if (!publicClient || !chain?.id) {
      setMarkets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      /*
       * Get the contract deployed on the currently
       * selected network.
       */
      const contractAddress = getContractAddress(chain.id);

      const count = await publicClient.readContract({
        address: contractAddress,
        abi: veyntAbi,
        functionName: "marketCount",
      });

      const loaded: Market[] = [];

      for (let id = 1n; id <= count; id++) {
        const result = await publicClient.readContract({
          address: contractAddress,
          abi: veyntAbi,
          functionName: "markets",
          args: [id],
        });

        const [
          owner,
          apiEndpoint,
          question,
          deadline,
          totalPool,
          resolved,
          outcome,
          merkleRoot,
          refundInitiated,
          startTime,
        ] = result;

        if (owner.toLowerCase() === ZERO.toLowerCase()) {
          continue;
        }

        loaded.push({
          id,
          owner,
          apiEndpoint,
          question,
          deadline,
          totalPool,
          resolved,
          outcome,
          merkleRoot,
          refundInitiated,
          startTime,
        });
      }

      setMarkets(loaded.reverse());
    } catch (error) {
      console.error("Failed to load markets:", error);

      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }, [publicClient, chain?.id]);

  useEffect(() => {
    loadMarkets();
  }, [loadMarkets]);

  /*
   * Reload markets after creating a market.
   */
  useEffect(() => {
    const handleMarketCreated = () => {
      loadMarkets();
    };

    window.addEventListener("veynt-market-created", handleMarketCreated);

    return () => {
      window.removeEventListener("veynt-market-created", handleMarketCreated);
    };
  }, [loadMarkets]);

  const unsupportedNetwork = chain?.id !== 968 && chain?.id !== 677;

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7fd509]">
              Prediction board
            </p>

            <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#212529] md:text-5xl">
              Explore markets.
            </h2>

            {chain?.id === 968 && (
              <p className="mt-3 text-sm text-[#6c757d]">
                Viewing markets on Bohr Testnet
              </p>
            )}

            {chain?.id === 677 && (
              <p className="mt-3 text-sm text-[#6c757d]">
                Viewing markets on BOT Mainnet
              </p>
            )}
          </div>

          <button
            onClick={loadMarkets}
            disabled={loading || unsupportedNetwork}
            className="w-fit rounded-full border border-[#e9ecef] px-5 py-2.5 text-sm text-[#212529] transition hover:border-[#212529] disabled:opacity-40"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Unsupported Network */}
        {unsupportedNetwork ? (
          <div className="rounded-[28px] border border-dashed border-[#e9ecef] py-28 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7fd509] text-xl font-medium text-[#212529]">
              V
            </div>

            <h3 className="mt-5 text-xl font-medium text-[#212529]">
              Unsupported network
            </h3>

            <p className="mt-2 text-sm text-[#6c757d]">
              Switch to BOT Mainnet or Bohr Testnet to explore markets.
            </p>
          </div>
        ) : loading ? (
          /* Loading */
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[330px] animate-pulse rounded-[28px] bg-[#f1f2f3]"
              />
            ))}
          </div>
        ) : markets.length === 0 ? (
          /* Empty */
          <div className="rounded-[28px] border border-dashed border-[#e9ecef] py-28 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7fd509] text-xl font-medium text-[#212529]">
              V
            </div>

            <h3 className="mt-5 text-xl font-medium text-[#212529]">
              No markets yet.
            </h3>

            <p className="mt-2 text-sm text-[#6c757d]">
              Create the first prediction market.
            </p>
          </div>
        ) : (
          /* Markets */
          <div className="grid gap-5 md:grid-cols-2">
            {markets.map((market) => (
              <MarketCard
                key={market.id.toString()}
                market={market}
                onRefresh={loadMarkets}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
