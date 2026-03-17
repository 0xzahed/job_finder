import HeroSection from "../components/HeroSection";
import {
  CategorySection,
  CompanyStrip,
  FeaturedJobsSection,
  LatestJobsSection,
  PromoSection,
  SiteFooter,
} from "../components/LandingSections";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] text-[#233253]">
      <div className="mx-auto w-full max-w-[1310px] px-5 pt-4 md:px-10 md:pt-[18px] lg:px-[58px]">
        <Navbar />
        <HeroSection />
      </div>
      <CompanyStrip />
      <div className="mx-auto w-full max-w-[1310px] px-5 md:px-10 lg:px-[58px]">
        <CategorySection />
        <PromoSection />
        <FeaturedJobsSection />
      </div>
      <LatestJobsSection />
      <SiteFooter />
    </div>
  );
}
