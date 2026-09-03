export default function PrivacyAndResolution() {
  return (
    <section className="bg-[#212529] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-16 max-w-[800px]">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#7fd509]">
            Under the Hood
          </p>

          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-1.5px] text-white md:text-5xl lg:text-6xl">
            Private by default.
            <br />
            Verifiable by design.
          </h2>

          <p className="mt-5 max-w-[650px] text-base leading-7 text-[#e9ecef]/60 md:text-lg">
            Veynt separates your prediction from the transaction, so the market
            can remain transparent without exposing your decision before
            resolution.
          </p>
        </div>

        {/* Main cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Privacy */}
          <div className="min-h-[500px] rounded-[28px] bg-[#7fd509] p-8 md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#212529]/50">
                  Privacy
                </p>

                <h3 className="mt-3 text-3xl font-medium tracking-[-1px] text-[#212529]">
                  Your position stays hidden.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#212529] text-xl text-[#7fd509]">
                ◉
              </div>
            </div>

            {/* Visual */}
            <div className="my-14 flex items-center justify-center">
              <div className="relative flex h-[180px] w-[300px] items-center justify-center">
                {/* Public */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-xl border-2 border-[#212529] px-5 py-4">
                  <p className="text-xs text-[#212529]/50">PUBLIC</p>

                  <p className="mt-1 text-sm font-medium text-[#212529]">
                    Wallet + Stake
                  </p>
                </div>

                {/* Encrypted */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-xl bg-[#212529] px-5 py-4">
                  <p className="text-xs text-white/50">PRIVATE</p>

                  <p className="mt-1 text-sm font-medium text-white">
                    YES / NO
                  </p>
                </div>

                {/* Connection */}
                <div className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 bg-[#212529]/40" />

                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#212529]">
                  🔒
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-medium text-[#212529]">
                Hide the decision, not the transaction.
              </p>

              <p className="mt-3 text-sm leading-6 text-[#212529]/60">
                Your wallet address, stake, market and transaction remain
                visible on-chain. What stays confidential is whether you
                selected YES or NO until the market resolves.
              </p>
            </div>
          </div>

          {/* Resolution */}
          <div className="min-h-[500px] rounded-[28px] border border-[#e9ecef]/15 bg-[#212529] p-8 md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#7fd509]">
                  Resolution
                </p>

                <h3 className="mt-3 text-3xl font-medium tracking-[-1px] text-white">
                  The outcome can be verified.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7fd509] text-xl text-[#212529]">
                ✓
              </div>
            </div>

            {/* Resolution flow */}
            <div className="my-14 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e9ecef]/30 text-xs text-[#e9ecef]">
                  FDC
                </div>

                <div className="w-8 border-t border-dashed border-[#e9ecef]/30" />

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7fd509] text-xs font-semibold text-[#212529]">
                  DATA
                </div>

                <div className="w-8 border-t border-dashed border-[#e9ecef]/30" />

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e9ecef]/30 text-xs text-white">
                  ROOT
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-medium text-white">
                From external data to on-chain settlement.
              </p>

              <p className="mt-3 text-sm leading-6 text-[#e9ecef]/60">
                FDC provides the external price data. The evaluator determines
                the outcome and builds the payout Merkle tree. The resulting
                outcome and root are then submitted to VeyntMarket for
                verifiable settlement.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom principle */}
        <div className="mt-6 rounded-[24px] border border-[#e9ecef]/15 px-7 py-8 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-[#7fd509]">
                Veynt Principle
              </p>

              <p className="mt-2 text-2xl font-medium text-white md:text-3xl">
                Hide the decision. Keep the settlement verifiable.
              </p>
            </div>

            <a
              href="/app"
              className="flex h-12 shrink-0 items-center justify-center rounded-full bg-[#7fd509] px-6 text-sm font-medium text-[#212529] transition-colors hover:bg-white"
            >
              Explore Veynt →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
