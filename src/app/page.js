import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWork from "@/components/HowItWork";
import NewsLetter from "@/components/NewsLetter";

export default function Home() {
  return (
    <main>
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Feature Section */}
      <Feature />

      {/* How It Work Section */}
      <HowItWork />

      {/* News Letter */}
      <NewsLetter />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
