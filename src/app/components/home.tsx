import { useState } from "react";
import { HeroSection } from "./hero-section";
import { IndustryGrid } from "./industry-grid";
import { ProductCatalog } from "./product-catalog";
import { TelemetryDashboard } from "./telemetry-dashboard";

interface HomeProps {
  onNavigate: (page: string, productId?: number) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);

  const handleIndustryFilter = (industry: string) => {
    setIndustryFilter(industry);
  };

  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <IndustryGrid onNavigate={onNavigate} onFilterIndustry={handleIndustryFilter} />
      <ProductCatalog onNavigate={onNavigate} activeIndustryFilter={industryFilter} />
      <TelemetryDashboard />
    </>
  );
}
