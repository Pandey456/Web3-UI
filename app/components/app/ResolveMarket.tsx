"use client";

import { useState } from "react";

export default function ResolveMarket({
  open,
  marketId,
  onClose,
  onResolved,
}: {
  open: boolean;
  marketId: bigint;
  onClose: () => void;
  onResolved: () => void;
}) {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const resolve = async () => {
    try {
      if (!token.trim()) {
        throw new Error("Enter your GitHub Personal Access Token.");
      }

      setBusy(true);

      const response = await fetch(
        "https://api.github.com/repos/Pandey456/VEYNT/actions/workflows/fdc-full-run.yml/dispatches",
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token.trim()}`,
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: "main",
            inputs: {
              market_id: marketId.toString(),
            },
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

        let message = "Failed to start resolution.";

        try {
          const errorData = JSON.parse(errorText);

          if (errorData.message) {
            message = errorData.message;
          }
        } catch {
          // Keep default error message.
        }

        throw new Error(message);
      }

      /*
       * GitHub returns 204 when the workflow dispatch
       * has been accepted successfully.
       */
      setToken("");

      onClose();

      alert(`Resolution workflow started for Market #${marketId.toString()}.`);

      onResolved();
    } catch (error) {
      console.error("Resolution failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to start market resolution.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#212529]/60 p-5 backdrop-blur-md">
      <div className="w-full max-w-[520px] rounded-[30px] bg-white p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7fd509]">
              Market resolution
            </p>

            <h2 className="mt-2 text-3xl font-medium tracking-tight text-[#212529]">
              Resolve Market #{marketId.toString()}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6c757d]">
              Start the Veynt resolution workflow. The evaluator will fetch the
              external price data, decrypt the predictions, calculate the
              outcome and publish the payout data.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={busy}
            className="text-2xl text-[#6c757d] transition hover:text-[#212529] disabled:opacity-40"
          >
            ×
          </button>
        </div>

        {/* Workflow */}
        <div className="mt-7 rounded-2xl bg-[#f5f5f5] p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6c757d]">
            Resolution process
          </p>

          <div className="mt-4 space-y-3 text-sm text-[#212529]">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7fd509] text-xs font-semibold">
                1
              </span>
              <span>Fetch market price data</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7fd509] text-xs font-semibold">
                2
              </span>
              <span>Decrypt and evaluate predictions</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7fd509] text-xs font-semibold">
                3
              </span>
              <span>Submit resolution and publish payouts</span>
            </div>
          </div>
        </div>

        {/* GitHub Token */}
        <div className="mt-6">
          <label className="text-xs font-medium uppercase tracking-wider text-[#6c757d]">
            GitHub Personal Access Token
          </label>

          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="github_pat_..."
            disabled={busy}
            className="mt-2 w-full rounded-xl border border-[#e9ecef] bg-[#f8f9f9] px-4 py-3.5 text-sm text-[#212529] placeholder:text-[#6c757d] outline-none transition focus:border-[#7fd509]"
          />

          <p className="mt-2 text-[11px] leading-5 text-[#6c757d]">
            Your token is used only to trigger the GitHub Actions workflow and
            is not stored by Veynt.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={busy}
            className="rounded-full border border-[#e9ecef] px-5 py-3 text-sm font-medium text-[#212529] transition hover:bg-[#f5f5f5] disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            onClick={resolve}
            disabled={busy || !token.trim()}
            className="rounded-full bg-[#7fd509] px-6 py-3 text-sm font-medium text-[#212529] transition hover:brightness-105 disabled:opacity-40"
          >
            {busy ? "Starting..." : "Start Resolution"}
          </button>
        </div>
      </div>
    </div>
  );
}
