"use client";

import { useState } from "react";
import CreateMarket from "./CreateMarket";

export default function AppHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-[#212529] px-6 py-20 text-white md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Left */}
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7fd509] text-sm font-semibold text-[#212529]">
                  V
                </span>

                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                  Veynt Markets
                </span>
              </div>

              <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] md:text-6xl lg:text-7xl">
                Predict what happens.
                <br />
                <span className="text-[#7fd509]">Keep it private.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
                Create markets, make encrypted predictions, and settle outcomes
                on BOT Chain.
              </p>
            </div>

            {/* Right */}
            <div className="lg:pb-1">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-white/40">
                      Create
                    </p>

                    <h2 className="mt-2 text-2xl font-medium">
                      Start a market
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7fd509] text-xl text-[#212529]">
                    +
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  Define an asset, target price and duration. Market creation
                  costs 1 BOT.
                </p>

                <button
                  onClick={() => setOpen(true)}
                  className="mt-7 w-full rounded-full bg-[#7fd509] px-6 py-3.5 text-sm font-medium text-[#212529] transition hover:brightness-105"
                >
                  Create Market
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CreateMarket open={open} onClose={() => setOpen(false)} />
    </>
  );
}
