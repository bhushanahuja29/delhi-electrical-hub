import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/catalog/CategoryGrid';
import BrandShowcase from '@/components/catalog/BrandShowcase';
import FeaturedProducts from '@/components/catalog/FeaturedProducts';
import RecentlyViewed from '@/components/catalog/RecentlyViewed';
import WhatsAppFab from '@/components/WhatsAppFab';
import Footer from '@/components/Footer';
import { useApp } from '@/contexts/AppContext';

const Home = () => {
  const { trackPageView } = useApp();

  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <BrandShowcase />
        <FeaturedProducts />
        <RecentlyViewed />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Home;
