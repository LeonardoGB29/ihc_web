import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  mission: string;
  details: string[];
}

const vrProject: ProjectData = {
  id: "vr-game",
  title: "Videojuego VR",
  shortDescription: "Experiencia inmersiva de realidad virtual que combina entretenimiento educativo con tecnología de vanguardia para crear mundos interactivos únicos.",
  mission: "Crear una plataforma de entretenimiento que eduque sobre sostenibilidad ambiental a través de experiencias inmersivas en realidad virtual.",
  details: [
    "Desarrollado con Unity 3D y tecnologías VR de última generación",
    "Mecánicas de juego que enseñan sobre conservación y reciclaje",
    "Entornos 3D fotorrealistas con ecosistemas interactivos",
    "Sistema de logros y progresión que motiva el aprendizaje",
    "Compatible con múltiples dispositivos VR (Oculus, HTC Vive, etc.)"
  ]
};

interface ProjectCardProps {
  project: ProjectData;
  onNavigateToProcess: () => void;
}

const ProjectCard = ({ project, onNavigateToProcess }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const moreInfoButtonRef = useRef<HTMLButtonElement>(null);
  const panelTitleRef = useRef<HTMLHeadingElement>(null);
  
  const [cardRef, cardInView] = useInView({ 
    threshold: 0.2, 
    triggerOnce: true 
  });

  const handleToggleExpand = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (isExpanded) {
      // Collapsing
      setIsExpanded(false);
      setTimeout(() => {
        setIsAnimating(false);
        // Return focus to "Más info" button
        moreInfoButtonRef.current?.focus();
      }, 180);
    } else {
      // Expanding
      setIsExpanded(true);
      setTimeout(() => {
        setIsAnimating(false);
        // Move focus to panel title
        panelTitleRef.current?.focus();
      }, 240);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleExpand();
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-surface border border-purple-border rounded-xl overflow-hidden transition-all duration-300",
        cardInView ? "animate-fade-in" : "opacity-0 translate-y-8",
        isExpanded && "border-cyan/30 shadow-elevated"
      )}
    >
      {/* Collapsed State */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-semibold text-text-primary">
          {project.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed text-base">
          {project.shortDescription}
        </p>

        {/* Action Buttons - Collapsed State */}
        <div className="flex gap-3 pt-2">
          <Button
            ref={moreInfoButtonRef}
            onClick={handleToggleExpand}
            onKeyDown={handleKeyDown}
            className="bg-purple text-white hover:bg-purple/90 focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background"
            aria-expanded={isExpanded}
            aria-controls={`project-details-${project.id}`}
            disabled={isAnimating}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Colapsar
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Más info
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onNavigateToProcess}
            className="border-purple-border bg-purple-translucent hover:bg-purple/10 hover:border-cyan/50 focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Proceso
          </Button>
        </div>
      </div>

      {/* Expanded Panel */}
      {(isExpanded || isAnimating) && (
        <div
          id={`project-details-${project.id}`}
          ref={detailsRef}
          className={cn(
            "border-t border-purple-border bg-surface/50 overflow-hidden",
            isExpanded && !isAnimating ? "animate-expand" : "animate-collapse",
            // Respect reduced motion preference
            "motion-reduce:animate-none motion-reduce:transition-none"
          )}
          role="region"
          aria-labelledby={`project-title-${project.id}`}
        >
          <div className="p-6 space-y-6">
            {/* Mission Section */}
            <div>
              <h3 
                ref={panelTitleRef}
                id={`project-title-${project.id}`}
                className="text-lg font-semibold text-text-primary mb-3 focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background rounded"
                tabIndex={-1}
              >
                Misión del proyecto
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {project.mission}
              </p>
            </div>

            {/* More Information Section */}
            <div>
              <h4 className="text-base font-medium text-text-primary mb-3">
                Más información del proyecto
              </h4>
              <ul className="space-y-2 text-text-secondary">
                {project.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons - Expanded State */}
            <div className="flex gap-3 pt-4 border-t border-purple-border/50">
              <Button
                variant="outline"
                onClick={onNavigateToProcess}
                className="border-purple-border bg-purple-translucent hover:bg-purple/10 hover:border-cyan/50 focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Proceso
              </Button>
              
              <Button
                onClick={handleToggleExpand}
                onKeyDown={handleKeyDown}
                className="bg-cyan text-white hover:bg-cyan/90 focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-background"
                aria-expanded={isExpanded}
                aria-controls={`project-details-${project.id}`}
                disabled={isAnimating}
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                Colapsar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsSimplified = () => {
  const [headerRef, headerInView] = useInView({ 
    threshold: 0.3, 
    triggerOnce: true 
  });

  const handleNavigateToProcess = () => {
    const processElement = document.getElementById('process');
    processElement?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="py-20">
      <div className="space-y-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "transition-all duration-700 transform",
            headerInView ? "animate-fade-in" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Proyectos
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Explora nuestros proyectos destacados y las tecnologías implementadas.
          </p>
        </div>

        {/* Single Project Card */}
        <div className="space-y-6">
          <ProjectCard 
            project={vrProject}
            onNavigateToProcess={handleNavigateToProcess}
          />
          
          {/* Placeholder for second project (hidden) */}
          {/* Future project will go here */}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSimplified;