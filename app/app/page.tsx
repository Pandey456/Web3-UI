import Header from "../components/header";
import Footer from "../components/footer";
import AppHero from "../components/app/AppHero";
import MarketBoard from "../components/app/MarketBoard";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <AppHero />
        <MarketBoard />
      </main>

      <Footer />
    </div>
  );
}
