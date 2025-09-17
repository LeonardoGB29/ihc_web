import { useState, useEffect } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, ProcessStep } from "@/services/mockApi";
import { cn } from "@/lib/utils";

interface ProcessProps {
  activeStep: number;
  onStepChange: (step: number) => void;
}

const Process = ({ activeStep, onStepChange }: ProcessProps) => {
  const [processData, setProcessData] = useState<{ steps: ProcessStep[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProcess = async () => {
      try {
        const data = await api.getProcess();
        setProcessData(data);
      } finally {
        setLoading(false);
      }
    };
    loadProcess();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="h-8 bg-purple-translucent rounded animate-pulse mb-8"></div>
        <div className="grid grid-cols-12 gap-6 h-96">
          <div className="col-span-3 bg-purple-translucent rounded animate-pulse"></div>
          <div className="col-span-6 bg-purple-translucent rounded animate-pulse"></div>
          <div className="col-span-3 bg-purple-translucent rounded animate-pulse"></div>
        </div>
      </section>
    );
  }

  const currentStep = processData?.steps.find(step => step.id === activeStep);

  return (
    <section className="py-20">
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-text-primary mb-4">Proceso de Desarrollo</h2>
          <p className="text-text-secondary text-lg mb-8">
            Conoce nuestra metodología paso a paso para crear soluciones tecnológicas innovadoras.
          </p>
        </div>

        {/* Three Panel Layout */}
        <div className="grid grid-cols-12 gap-6 min-h-[500px]">
          {/* Timeline Panel (Left) */}
          <div className="col-span-12 md:col-span-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Etapas</h3>
              {processData?.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => onStepChange(step.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-smooth relative",
                    activeStep === step.id
                      ? "bg-purple text-white border-cyan shadow-subtle"
                      : "bg-surface text-text-secondary border-purple-border hover:text-text-primary hover:bg-purple/5 hover:border-cyan/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border",
                      activeStep === step.id 
                        ? "bg-cyan text-background border-cyan" 
                        : "bg-purple-translucent border-purple-border"
                    )}>
                      {step.id}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                    </div>
                  </div>
                  
                  {/* Connection line */}
                  {index < (processData?.steps.length ?? 0) - 1 && (
                    <div className="absolute left-8 top-12 w-0.5 h-8 bg-purple-border"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Viewer Panel (Center) */}
          <div className="col-span-12 md:col-span-6">
            <div className="bg-surface border border-purple-border rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {currentStep?.title}
              </h3>
              
              <div className="aspect-video bg-background rounded-lg mb-4 overflow-hidden relative group">
                {currentStep?.media.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-translucent to-cyan-translucent">
                    <Button 
                      size="lg"
                      className="bg-purple hover:bg-purple/90 shadow-elevated"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Reproducir Video
                    </Button>
                  </div>
                ) : (
                  <img 
                    src={currentStep?.media.src} 
                    alt={currentStep?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                )}
                
                {currentStep?.media.type === 'gif' && (
                  <div className="absolute top-2 right-2 bg-purple text-white px-2 py-1 rounded text-xs font-medium">
                    GIF
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  Etapa {currentStep?.id} de {processData?.steps.length}
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-purple-border bg-purple-translucent hover:bg-purple/10"
                    disabled={activeStep === 1}
                    onClick={() => onStepChange(Math.max(1, activeStep - 1))}
                  >
                    Anterior
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-cyan text-white hover:bg-cyan/90"
                    disabled={activeStep === processData?.steps.length}
                    onClick={() => onStepChange(Math.min(processData?.steps.length ?? 1, activeStep + 1))}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel (Right) */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-surface border border-purple-border rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Detalles</h3>
              
              <div className="space-y-4">
                <p className="text-text-secondary text-sm leading-relaxed">
                  {currentStep?.summary}
                </p>

                {currentStep?.links && currentStep.links.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-text-primary">Enlaces de interés:</h4>
                    {currentStep.links.map((link, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="w-full justify-start border-purple-border bg-purple-translucent hover:bg-purple/10 text-xs"
                        onClick={() => window.open(link, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Ver recurso {index + 1}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-purple-border">
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>Progreso</span>
                    <span>{Math.round((activeStep / (processData?.steps.length ?? 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-purple-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple to-cyan h-2 rounded-full transition-smooth"
                      style={{ width: `${(activeStep / (processData?.steps.length ?? 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;