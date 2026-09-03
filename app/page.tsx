import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero";
import Features from "@/app/components/features";
import HowItWorks from "@/app/components/howItWorks";
import MarketFlow from "@/app/components/MarketFlow";
import PayoutSection from "@/app/components/PayoutSection";
import Footer from "@/app/components/footer";
export default function Home() {
  return (
    <>
      {" "}
      <Header />
      <HeroSection />
      <Features />
      <MarketFlow />
      <HowItWorks />
      <PayoutSection />
      <Footer />
      {/* Your homepage content */}{" "}
    </>
  );
}
