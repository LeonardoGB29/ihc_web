import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import RadialMenu from "./RadialMenu";
import Projects from "./sections/Projects";
import Process from "./sections/Process";
import Repository from "./sections/Repository";
import Team from "./sections/Team";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [processStep, setProcessStep] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  // Intersection observers for scroll spy
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [processRef, processInView] = useInView({ threshold: 0.3 });
  const [repositoryRef, repositoryInView] = useInView({ threshold: 0.3 });
  const [teamRef, teamInView] = useInView({ threshold: 0.3 });

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

  // Update active section based on scroll position
  useEffect(() => {
    if (teamInView) setActiveSection('team');
    else if (repositoryInView) setActiveSection('repository');
    else if (processInView) setActiveSection('process');
    else if (projectsInView) setActiveSection('projects');
  }, [projectsInView, processInView, repositoryInView, teamInView]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
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
              processStep={processStep}
              onProcessStepChange={handleProcessStepChange}
            />
          </div>

          {/* Right Column - Content (75%) */}
          <div className="w-3/4 px-8 py-12">
            <div className="max-w-6xl">
              {/* Projects Section */}
              <div id="projects" ref={projectsRef}>
                <Projects />
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
              <Projects />
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