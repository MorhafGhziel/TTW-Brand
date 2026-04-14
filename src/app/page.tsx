import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import FeaturedProducts from "../../components/FeaturedProducts";

import TrustBadges from "../../components/TrustBadges";
import CTABanner from "../../components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />

      <TrustBadges />
      <CTABanner />
      <Footer />
    </>
  );
}
