import { useState, useEffect } from "react";
import { Folder, GitBranch, Users, Workflow, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadialMenuProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  processStep?: number;
  onProcessStepChange?: (step: number) => void;
}

const menuItems = [
  { id: 'projects', label: 'Proyectos', icon: Folder },
  { id: 'process', label: 'Proceso', icon: Workflow },
  { id: 'repository', label: 'Repositorio', icon: GitBranch },
  { id: 'team', label: 'Integrantes', icon: Users },
  { id: 'hero', label: 'Inicio', icon: ArrowUp }, // botón de regreso arriba
];

const processSteps = [
  { id: 1, title: "Análisis" },
  { id: 2, title: "Diseño" }, 
  { id: 3, title: "Desarrollo" },
  { id: 4, title: "Testing" },
  { id: 5, title: "Deploy" },
];

const RadialMenu = ({ activeSection, onNavigate, processStep = 1, onProcessStepChange }: RadialMenuProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        {/* TODO (maybe) */}
      </>
    );
  }

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-50">
      <div className="relative">
        {/* Radial Arc Menu - Half circle cut vertically on the right */}
        <div className="relative w-36 h-56">
          {menuItems.map((item, index) => {
            if (item.id === "hero") return null; // skip hero en el menú lateral

            const adjustedAngle = 90 + index * 60;
            const radian = -(adjustedAngle * Math.PI) / 180;
            const radius = 90;

            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            // 🔑 factor común: estilos de los botones
            const baseClasses =
              "absolute w-16 h-16 rounded-full flex flex-col items-center justify-center text-xs transition-smooth transform -translate-x-1/2 -translate-y-1/2 border group";
            const activeClasses =
              "bg-purple text-white border-cyan shadow-elevated scale-110";
            const inactiveClasses =
              "bg-purple-translucent text-text-secondary border-purple-border hover:text-text-primary hover:bg-purple/30 hover:border-cyan/50";

            // 🔑 posibilidad de modificar según activeSection
            const conditionalClasses =
              activeSection === "hero"
                ? "opacity-70 hover:opacity-100" // ejemplo: botones menos marcados en hero
                : "";

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  baseClasses,
                  activeSection === item.id ? activeClasses : inactiveClasses,
                  conditionalClasses
                )}
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                title={item.label}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Central hub */}
          {activeSection === "hero" ? (
            <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-purple-translucent border-2 border-purple-border rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple rounded-full" />
            </div>
          ) : (
            <button
              onClick={() => onNavigate("hero")}
              className="absolute left-1/2 top-1/2 w-12 h-12 bg-purple text-white border-2 border-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:scale-110 shadow-elevated"
              title="Inicio"
            >
              <ArrowUp className="w-5 h-5" /> {/* 🔼 tu icono */}
            </button>
          )}
        </div>
      </div>
    </div>

  );
};

export default RadialMenu;