"use client";

import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { StatsSection } from "@/components/sections/stats";
import { PricingSection } from "@/components/sections/pricing";
import { CTASection } from "@/components/sections/cta";
import { AboutSection } from "@/components/sections/about";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Main App Component
const App = () => {
  return (
    <div className="relative">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AboutSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default App;
