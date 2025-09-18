import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  activeStep: number;
  onStepChange: (step: number) => void;
}

const Hero = ({ activeStep, onStepChange }: HeroProps) => {
  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Diagonal Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 rotate-45 border border-purple-border"></div>
          <div className="absolute top-40 right-32 w-24 h-24 rotate-45 border border-cyan/20"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 rotate-45 border border-purple-border"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <p className="text-text-secondary text-sm mb-4 font-medium tracking-wide uppercase">
          Universidad Nacional de San Agustín
        </p>
        
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
          Proyecto de{' '}
          <span className="block text-purple">Interacción Humano-Computador</span>
        </h1>
        
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Explorando la intersección entre las personas, la tecnología y el diseño para crear experiencias digitales significativas y accesibles.
          <br />
          Messi el GOAT 🐐
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            onClick={() => onStepChange(1)}
            className="bg-purple hover:bg-purple/90 text-white px-8 py-6 text-lg transition-micro border border-purple-border hover:border-cyan/50 motion-reduce:transition-none"
          >
            Ver Proyectos
          </Button>
          <Button 
            onClick={() => onStepChange(2)}
            variant="outline"
            className="border-purple-border bg-purple-translucent hover:bg-purple/10 text-text-primary px-8 py-6 text-lg transition-micro hover:border-cyan/50 motion-reduce:transition-none"
          >
            Conocer Proceso
          </Button>
        </div>
      </div>

      {/* Scroll Indicator with reduced motion support */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-secondary hover:text-cyan transition-micro motion-reduce:animate-none"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-6 h-6 animate-bounce motion-reduce:animate-none" />
      </button>
    </section>
  );
};

export default Hero;