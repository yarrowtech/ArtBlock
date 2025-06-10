import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CardGrid from '../components/CardGrid';
import BusinessSection from '../components/BusinessSection';
import PromoBanner from '../components/PromoBanner';
import CustomerExperience from '../components/CustomerExperience';
import BottomPromoGrid from '../components/BottomPromoGrid';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <CardGrid />
      <BusinessSection />
      <PromoBanner />
      <CustomerExperience />
      <BottomPromoGrid />
      <Footer />
    </div>
  );
}

export default Home;
