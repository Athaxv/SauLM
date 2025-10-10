
import Navbar from "@/components/Navbar";
import HeroSection from "../components/homeSection";
import Testimonials from "@/components/Testimonials";
// import UploadSection from "@/components/UploadSection";
// import AskSection from "@/components/AskSection";
// import Features from "@/components/Features";
// import SpecsSection from "@/components/SpecsSection";
// import Testimonials from "@/components/Testimonials";
// import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
  {/* Navbar */}
  <Navbar />

  {/* Main content takes full remaining height */}
  <main className="flex-1">
    <HeroSection />
    <Testimonials />
  </main>

  {/* Footer only shows after scroll */}
  {/* <Footer /> */}
</div>

  );
}
