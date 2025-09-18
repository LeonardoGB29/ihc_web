import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Process from "./sections/Process";
import Repository from "./sections/Repository";
import Team from "./sections/Team";
import RadialMenu from "./RadialMenu";

// Definimos un array con todas las secciones
const sections = [
  { id: "hero", Component: Hero },
  { id: "projects", Component: Projects },
  { id: "process", Component: Process },
  { id: "repository", Component: Repository },
  { id: "team", Component: Team },
];

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [processStep, setProcessStep] = useState(1);

  // Detectar la sección activa con scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Inicializar al cargar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleProcessStepChange = (step: number) => {
    setProcessStep(step);
  };

  return (
    <div id="main-content" className="relative min-h-screen">
      {/* Radial Menu */}
      <RadialMenu
        activeSection={activeSection}
        onNavigate={handleNavigate}
        processStep={processStep}
        onProcessStepChange={handleProcessStepChange}
      />

      {/* Render dinámico de secciones */}
      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {sections.map(({ id, Component }) => (
            <section
              id={id}
              key={id}
              className={id !== "hero" ? "pt-20" : ""}
            >
              <Component
                {...(id === "process"
                  ? {
                      activeStep: processStep,
                      onStepChange: handleProcessStepChange,
                    }
                  : {})}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
