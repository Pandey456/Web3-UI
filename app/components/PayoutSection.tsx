export default function PayoutSection() {
  const allocations = [
    {
      label: "Winning Bettors",
      percentage: "86%",
      description: "Split proportionally by stake",
    },
    {
      label: "Market Creator",
      percentage: "10%",
      description: "Reward for creating the market",
    },
    {
      label: "Veynt Treasury",
      percentage: "3%",
      description: "Platform share",
    },
    {
      label: "Resolver",
      percentage: "1%",
      description: "Resolution submitter",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-14 max-w-[750px]">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#7fd509]">
            Payout Model
          </p>

          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-1.5px] text-[#212529] md:text-5xl lg:text-6xl">
            The pool is
            <br />
            shared by design.
          </h2>

          <p className="mt-5 max-w-[620px] text-base leading-7 text-[#212529]/60 md:text-lg">
            Veynt uses a parimutuel payout model. Winners share the
            distributable pool proportionally to their stake.
          </p>
        </div>

        {/* Main payout card */}
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* 86% */}
          <div className="flex min-h-[420px] flex-col justify-between rounded-[28px] bg-[#7fd509] p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-wider text-[#212529]/60">
                Winning Bettors
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#212529]">
                Largest Share
              </span>
            </div>

            <div>
              <p className="text-[100px] font-medium leading-none tracking-[-5px] text-[#212529] md:text-[130px]">
                86%
              </p>

              <p className="mt-4 max-w-[450px] text-base leading-7 text-[#212529]/65">
                Goes to winning bettors and is split proportionally according to
                their stake in the winning side.
              </p>
            </div>
          </div>

          {/* Remaining allocation */}
          <div className="rounded-[28px] bg-[#212529] p-8 md:p-10">
            <div className="space-y-0">
              {allocations.slice(1).map((allocation, index) => (
                <div
                  key={allocation.label}
                  className={`flex items-center justify-between py-7 ${
                    index !== allocations.length - 2
                      ? "border-b border-[#e9ecef]/15"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-white">{allocation.label}</p>

                    <p className="mt-1 text-sm text-[#e9ecef]/50">
                      {allocation.description}
                    </p>
                  </div>

                  <span className="text-3xl font-medium text-[#7fd509]">
                    {allocation.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="mt-5 rounded-[24px] border border-[#e9ecef] bg-[#e9ecef]/40 p-7 md:p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-[#212529]/50">
            Example
          </p>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-2xl font-medium text-[#212529]">
                15 BOT total pool
              </p>

              <p className="mt-2 text-sm leading-6 text-[#212529]/60">
                After the 14% total allocation to creator, platform, and
                resolver, 12.90 BOT is distributed to the winning bettors.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-white px-6 py-4">
              <p className="text-sm text-[#212529]/50">Winner A</p>

              <p className="text-2xl font-medium text-[#212529]">10.32 BOT</p>
            </div>

            <div className="shrink-0 rounded-2xl bg-white px-6 py-4">
              <p className="text-sm text-[#212529]/50">Winner B</p>

              <p className="text-2xl font-medium text-[#212529]">2.58 BOT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
