import Hero from "@/components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedSpecialists from "../components/home/FeaturedSpecialists";
import WhyChooseSavia from "../components/home/WhyChooseSavia";
import FooterCTA from "../components/home/FooterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedSpecialists />
      <WhyChooseSavia />
      <FooterCTA />
    </>
  );
}