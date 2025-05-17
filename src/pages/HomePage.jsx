import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import TestimonialsSection from "../components/TestimonialsSection"
import PricingSectionAlt from "../components/PricingSectionAlt"
import CtaSection from "../components/CtaSection"
import StatsSection from "../components/StatsSection"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSectionAlt />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
