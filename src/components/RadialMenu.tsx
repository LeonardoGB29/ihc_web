import { useState, useEffect } from "react";
import { Folder, GitBranch, Users, Workflow, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        {/* Mobile FAB */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 left-6 z-50 w-12 h-12 bg-purple border border-purple-border rounded-full flex items-center justify-center text-white hover:bg-purple/90 transition-smooth shadow-elevated"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Side Panel */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-purple-border p-6" onClick={e => e.stopPropagation()}>
              <div className="mt-16 space-y-4">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-smooth",
                      activeSection === item.id
                        ? "bg-purple text-white border border-cyan"
                        : "text-text-secondary hover:text-text-primary hover:bg-purple-translucent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-1/4 flex items-center justify-center z-30">
      <div className="relative">
        {/* Radial Arc Menu */}
        <div className="relative w-56 h-56">
          {menuItems.map((item, index) => {
            const angle = (index * 30) - 45; // More spread for better spacing
            const radian = (angle * Math.PI) / 180;
            const radius = 100; // Increased radius for more spacing
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "absolute w-16 h-16 rounded-full flex flex-col items-center justify-center text-xs transition-smooth transform -translate-x-1/2 -translate-y-1/2 border",
                  activeSection === item.id
                    ? "bg-purple text-white border-cyan shadow-elevated"
                    : "bg-purple-translucent text-text-secondary border-purple-border hover:text-text-primary hover:bg-purple/20 hover:border-cyan/50"
                )}
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                title={item.label}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadialMenu;