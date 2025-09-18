import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import MainLayout from "@/components/MainLayout";

const Index = () => {
  const [showMainLayout, setShowMainLayout] = useState(false);

  // Check if user has scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setShowMainLayout(scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    // Scroll to main content and then to specific section
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <Hero onNavigate={handleNavigate} />
      
      {/* Main Layout - appears after hero */}
      <MainLayout />
    </div>
  );
};

export default Index;