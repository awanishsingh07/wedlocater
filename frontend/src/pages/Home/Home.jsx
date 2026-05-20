import HeroSection         from "../../components/common/HeroSection";
import SearchSection       from "../../components/common/SearchSection";
import FeaturedCategories  from "../../components/cards/FeaturedCategories";

export default function Home() {
  return (
    <div className="bg-ivory">
      {/* Full-bleed hero with parallax */}
      <HeroSection />

      {/* Floating search card overlapping hero bottom */}
      <SearchSection />

      {/* Spacer so search card clears the hero stats bar */}
      <div className="h-10 bg-ivory" />

      {/* Featured categories */}
      <FeaturedCategories />
    </div>
  );
}