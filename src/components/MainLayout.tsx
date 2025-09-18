import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import RadialMenu from "./RadialMenu";
import ProjectsSimplified from "./sections/ProjectsSimplified";
import Process from "./sections/Process";
import Repository from "./sections/Repository";
import Team from "./sections/Team";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [processStep, setProcessStep] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  // Intersection observers for scroll spy - improved with directional detection
  const [projectsRef, projectsInView] = useInView({ 
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });
  const [processRef, processInView] = useInView({ 
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });
  const [repositoryRef, repositoryInView] = useInView({ 
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });
  const [teamRef, teamInView] = useInView({ 
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });

  // Show menu when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        setShowMenu(heroRect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position with bidirectional support
  useEffect(() => {
    // Determine scroll direction and update active section accordingly
    let newActiveSection = activeSection;
    
    if (teamInView) newActiveSection = 'team';
    else if (repositoryInView) newActiveSection = 'repository';
    else if (processInView) newActiveSection = 'process';
    else if (projectsInView) newActiveSection = 'projects';
    
    // Only update if section actually changed to prevent unnecessary re-renders
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [projectsInView, processInView, repositoryInView, teamInView, activeSection]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleGoUp = () => {
    const contentElement = document.getElementById('projects');
    contentElement?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleProcessStepChange = (step: number) => {
    setProcessStep(step);
  };

  return (
    <div id="main-content" className="relative min-h-screen">
      {/* Fixed Two-Column Layout - Only show after hero */}
      {showMenu && (
        <div className="flex">
          {/* Left Column - Radial Menu (25%) */}
          <div className="w-1/4 relative">
            <RadialMenu 
              activeSection={activeSection}
              onNavigate={handleNavigate}
              showGoUp={showMenu}
              onGoUp={handleGoUp}
              processStep={processStep}
              onProcessStepChange={handleProcessStepChange}
            />
          </div>

          {/* Right Column - Content (75%) */}
          <div className="w-3/4 px-8 py-12">
            <div className="max-w-6xl">
              {/* Projects Section */}
              <div id="projects" ref={projectsRef}>
                <ProjectsSimplified />
              </div>

              {/* Process Section */}
              <div id="process" ref={processRef} className="pt-20">
                <Process 
                  activeStep={processStep}
                  onStepChange={handleProcessStepChange}
                />
              </div>

              {/* Repository Section */}
              <div id="repository" ref={repositoryRef} className="pt-20">
                <Repository />
              </div>

              {/* Team Section */}
              <div id="team" ref={teamRef} className="pt-20">
                <Team />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content without menu when hero is visible */}
      {!showMenu && (
        <div className="px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Projects Section */}
            <div id="projects" ref={projectsRef}>
              <ProjectsSimplified />
            </div>

            {/* Process Section */}
            <div id="process" ref={processRef} className="pt-20">
              <Process 
                activeStep={processStep}
                onStepChange={handleProcessStepChange}
              />
            </div>

            {/* Repository Section */}
            <div id="repository" ref={repositoryRef} className="pt-20">
              <Repository />
            </div>

            {/* Team Section */}
            <div id="team" ref={teamRef} className="pt-20">
              <Team />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;