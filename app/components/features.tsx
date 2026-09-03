export default function Features() {
  const features = [
    {
      title: "Private Predictions",
      description:
        "Your YES or NO choice stays encrypted until the market is resolved.",
      visual: "01",
    },
    {
      title: "Verifiable Settlement",
      description:
        "External data comes from FDC while BOT Chain handles the final settlement.",
      visual: "02",
    },
    {
      title: "Fair Payouts",
      description:
        "Winning bettors receive proportional payouts based on their share of the pool.",
      visual: "03",
    },
  ];

  return (
    <section className="bg-[#212529] px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-14 max-w-[950px]">
          <h2 className="text-4xl font-medium leading-[1.15] tracking-[-1.5px] text-white md:text-5xl lg:text-6xl">
            Prediction markets
            <span className="mx-2 inline-flex h-[0.72em] w-[0.72em] items-center justify-center rounded-full bg-[#7fd509] align-middle">
              <span className="text-[0.55em] font-semibold text-[#212529]">
                ↗
              </span>
            </span>
            built differently.
          </h2>

          <p className="mt-6 max-w-[650px] text-base leading-7 text-[#e9ecef]/70 md:text-lg">
            Veynt keeps your prediction private while keeping settlement
            transparent and verifiable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex min-h-[420px] flex-col rounded-[24px] border border-[#e9ecef]/15 bg-[#ffffff]/5 p-6 transition-all duration-300 hover:border-[#7fd509]/50 hover:bg-[#ffffff]/10"
            >
              {/* Visual */}
              <div className="flex flex-1 items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#7fd509]/30" />

                  <div className="absolute inset-5 rounded-full border border-[#e9ecef]/20" />

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#7fd509]">
                    <span className="text-xl font-semibold text-[#212529]">
                      {feature.visual}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-medium text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#e9ecef]/60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4">
          <a
            href="/app"
            className="flex h-[76px] items-center justify-between rounded-[20px] bg-[#7fd509] px-7 text-lg font-medium text-[#212529] transition-all duration-300 hover:bg-[#212529] hover:text-white hover:ring-1 hover:ring-[#7fd509]"
          >
            <span>Explore Veynt</span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#212529] text-xl text-white">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
