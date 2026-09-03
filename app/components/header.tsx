"use client";

import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#e9ecef]">
      <div className="mx-auto flex h-[86px] max-w-[1200px] items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Veynt" width={30} height={30} />

          <span className="text-[21px] font-medium text-[#212529]">Veynt</span>
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <Link
            href="/"
            className="text-sm text-[#212529] hover:text-[#7fd509]"
          >
            Home
          </Link>

          <a
            href="https://github.com/Pandey456/VEYNT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#212529] hover:text-[#7fd509]"
          >
            GitHub
          </a>

          <Link
            href="/app"
            className="text-sm text-[#212529] hover:text-[#7fd509]"
          >
            App
          </Link>
        </nav>

        {/* RainbowKit */}
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
}
