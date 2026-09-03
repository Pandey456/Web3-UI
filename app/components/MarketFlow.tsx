export default function MarketFlow() {
  const steps = [
    {
      number: "01",
      title: "Create a Market",
      description:
        "Set the asset, direction, target price, and duration. Creating a market costs a fixed 1 BOT fee.",
    },
    {
      number: "02",
      title: "Make Your Prediction",
      description:
        "Choose YES or NO and stake your BOT. Your prediction is encrypted in the browser before being submitted on-chain.",
    },
    {
      number: "03",
      title: "Market Resolution",
      description:
        "After the deadline, the evaluator uses FDC data to determine the outcome and publishes a verifiable settlement.",
    },
    {
      number: "04",
      title: "Claim Your Payout",
      description:
        "If you win, your payout is verified with a Merkle proof and can be claimed directly from the market.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="mb-14 max-w-[750px]">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#7fd509]">
            The Veynt Flow
          </p>

          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-1.5px] text-[#212529] md:text-5xl lg:text-6xl">
            From prediction
            <br />
            to payout.
          </h2>

          <p className="mt-5 max-w-[600px] text-base leading-7 text-[#212529]/60 md:text-lg">
            Create a market, take a position, and let the outcome determine the
            winners.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`min-h-[300px] rounded-[24px] p-7 md:p-8 ${
                index % 2 === 0
                  ? "bg-[#212529] text-white"
                  : "bg-[#e9ecef] text-[#212529]"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-sm font-medium ${
                    index % 2 === 0 ? "text-[#e9ecef]/60" : "text-[#212529]/50"
                  }`}
                >
                  {step.number}
                </span>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    index % 2 === 0
                      ? "bg-[#7fd509] text-[#212529]"
                      : "bg-[#7fd509] text-[#212529]"
                  }`}
                >
                  →
                </div>
              </div>

              <div className="mt-20">
                <h3 className="text-2xl font-medium">{step.title}</h3>

                <p
                  className={`mt-3 max-w-[450px] text-sm leading-6 ${
                    index % 2 === 0 ? "text-[#e9ecef]/65" : "text-[#212529]/60"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
