import "./globals.css";
import { Poppins } from "next/font/google";

import { type ReactNode } from "react";
import { Providers } from "./provider";
export const metadata = {
  title: "Veynt — Private Prediction Markets",
  description: "A confidential prediction market built on BOT Chain.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout(prop: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${poppins.className}`}>
        <Providers>{prop.children}</Providers>
      </body>
    </html>
  );
}
