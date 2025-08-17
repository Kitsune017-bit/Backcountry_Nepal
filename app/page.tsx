import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Itinerary from "@/components/Itinerary";
import Vision from "@/components/Vision";
import Gallery from "@/components/Gallery";
import PricingBooking from "@/components/PricingBooking";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Loader from "@/components/loading";

// import InfiniteNameLoop from "@/components/Infinite";

export default function Home() {
  return (
    <>
      <Navbar />
      <Loader/>
      <Hero />
      {/* <InfiniteNameLoop/> */}
       <Highlights />
      <Itinerary />
      <Vision />
      <Gallery />
      <PricingBooking />
      <Testimonials />
      <Contact/> 
      <Footer /> 
    </>
  );
}
