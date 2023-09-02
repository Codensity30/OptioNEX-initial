import React from "react";
import HeroSection from "./HeroSection";
import ComparisonSection from "./ComparisonSection";
import FeatureSection from "./FeatureSection";
import TradersLove from "./TradersLove";
import Testimonals from "./Testimonals";
import Footer from "./Footer";
import Header from "./Header";

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ComparisonSection />
      <FeatureSection />
      <TradersLove />
      <Testimonals />
      <Footer />
    </>
  );
}

export default LandingPage;
