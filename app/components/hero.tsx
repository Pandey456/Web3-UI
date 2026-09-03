export default function Hero() {
  return (
    <section className="bg-white px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <h1 className="max-w-[1100px] text-5xl font-medium leading-[1.05] tracking-[-2px] text-[#212529] sm:text-6xl md:text-7xl lg:text-[88px]">
          Predict
          <span className="mx-3 inline-flex h-[0.75em] w-[0.75em] items-center justify-center rounded-full bg-[#7fd509] align-middle">
            <span className="inline-block scale-[0.65] text-6xl font-semibold text-[#212529]">
              ✱
            </span>
          </span>
          what
          <br />
          happens next
        </h1>

        {/* Subheading */}
        <p className="mt-8 max-w-[520px] text-base leading-7 text-[#212529]/65 md:text-lg">
          Veynt is a decentralized prediction market where you can trade on
          real-world outcomes using crypto.
        </p>

        {/* Cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* Main visual */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#e9ecef] bg-[#212529]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border border-[#7fd509]/30">
                <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#7fd509]">
                  <span className="inline-block scale-[0.55] text-6xl font-semibold text-[#212529]">
                    V
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h2 className="text-2xl font-medium text-white">
                Prediction Markets
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#e9ecef]/70">
                Discover markets, take positions, and let the outcome determine
                your payout.
              </p>
            </div>
          </div>

          {/* Side card */}
          <div className="flex min-h-[420px] flex-col justify-between rounded-[28px] bg-[#7fd509] p-7">
            <div>
              <p className="text-sm font-medium text-[#212529]/70">
                LIVE MARKETS
              </p>

              <h2 className="mt-4 text-5xl font-medium tracking-[-2px] text-[#212529]">
                24+
              </h2>

              <p className="mt-2 text-sm text-[#212529]/70">
                Active prediction markets
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-white/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#212529]">
                    BTC above $100K
                  </span>

                  <span className="text-sm font-semibold text-[#212529]">
                    68%
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#212529]">
                    ETH above $5K
                  </span>

                  <span className="text-sm font-semibold text-[#212529]">
                    42%
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#212529]">
                    BTC ETF inflows
                  </span>

                  <span className="text-sm font-semibold text-[#212529]">
                    81%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
