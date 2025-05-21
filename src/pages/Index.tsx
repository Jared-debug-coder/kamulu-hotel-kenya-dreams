
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import FeaturedRooms from "@/components/FeaturedRooms";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kamulu Waters Hotel | Home";
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <AboutPreview />
      <FeaturedRooms />
      <Amenities />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Index;
