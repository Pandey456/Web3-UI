import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "App", href: "/app" },
  {
    label: "GitHub",
    href: "https://github.com/Pandey456/VEYNT",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#212529] px-6 py-16 text-white md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Main */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="Veynt" width={42} height={42} />

              <span className="text-5xl font-medium tracking-tight">Veynt</span>
            </Link>
          </div>

          {/* Message */}
          <div className="max-w-md md:ml-auto">
            <h2 className="text-2xl font-medium leading-tight md:text-3xl">
              Keep the prediction private.
              <br />
              <span className="text-[#7fd509]">
                Keep the settlement verifiable.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/50">
              A confidential prediction market built on BOT Chain.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-20 flex flex-col gap-8 border-b border-white/15 pb-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition hover:text-[#7fd509]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 transition hover:text-[#7fd509]"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <span className="text-sm text-white/40">Built on BOT Chain</span>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 pt-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Veynt</span>

          <span>Hide the decision. Keep the settlement verifiable.</span>
        </div>
      </div>
    </footer>
  );
}
