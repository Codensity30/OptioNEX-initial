import React from "react";
import HeroSection from "./HeroSection";
import ComparisonSection from "./ComparisonSection";
import FeatureSection from "./FeatureSection";
import TradersLove from "./TradersLove";
import Testimonals from "./Testimonals";
import FooterSection from "./FooterSection";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ComparisonSection />
      <FeatureSection />
      <TradersLove />
      <Testimonals />
      <FooterSection />
    </>
  );
}

export default LandingPage;
