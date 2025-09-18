import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, Repository as RepoType } from "@/services/mockApi";
import { cn } from "@/lib/utils";

const Repository = () => {
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [gridRef, gridInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await api.getRepositories();
        setRepos(data);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="space-y-8">
          <div className="h-8 bg-purple-translucent rounded animate-pulse"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-surface border border-purple-border rounded-xl p-6 space-y-4">
                <div className="h-6 bg-purple-translucent rounded animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-purple-translucent rounded animate-pulse"></div>
                  <div className="aspect-video bg-purple-translucent rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="space-y-8">
        <div 
          ref={headerRef}
          className={cn(
            "transition-all duration-700 transform",
            headerInView ? "animate-fade-in" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">Repositorio</h2>
          <p className="text-text-secondary text-lg mb-8">
            Explora el código en acción: desde el desarrollo hasta el resultado final.
          </p>
        </div>

        {/* Repository Grid */}
        <div 
          ref={gridRef}
          className={cn(
            "grid md:grid-cols-2 gap-6 transition-all duration-700 transform",
            gridInView ? "animate-fade-in" : "opacity-0 translate-y-8"
          )}
        >
          {repos.map((repo, index) => (
            <div 
              key={repo.id}
              className={cn(
                "group bg-surface border border-purple-border rounded-xl p-6 hover:shadow-elevated transition-smooth hover:border-cyan/30 transform",
                gridInView ? "animate-scale-in" : "opacity-0 scale-95"
              )}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4 group-hover:text-cyan transition-smooth">
                {repo.title}
              </h3>

              {/* Code and Result GIFs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Code GIF */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-secondary">Código</h4>
                  <div className="aspect-video bg-background rounded-lg overflow-hidden relative group/gif">
                    <img 
                      src={repo.codeGif} 
                      alt={`${repo.title} - Código`}
                      className="w-full h-full object-cover group-hover/gif:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover/gif:opacity-100 transition-smooth flex items-center justify-center">
                      <div className="bg-purple text-white px-3 py-1 rounded-full text-xs font-medium">
                        Ver código escribiéndose
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result GIF */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-secondary">Resultado</h4>
                  <div className="aspect-video bg-background rounded-lg overflow-hidden relative group/gif">
                    <img 
                      src={repo.resultGif} 
                      alt={`${repo.title} - Resultado`}
                      className="w-full h-full object-cover group-hover/gif:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover/gif:opacity-100 transition-smooth flex items-center justify-center">
                      <div className="bg-cyan text-white px-3 py-1 rounded-full text-xs font-medium">
                        Ver demo ejecutándose
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repository Link */}
              <Button 
                className="w-full bg-purple hover:bg-purple/90 text-white border border-purple-border hover:border-cyan/50 transition-smooth"
                onClick={() => window.open(repo.repoUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Ver Repositorio
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className={cn(
            "text-center pt-8 transition-all duration-700 transform",
            ctaInView ? "animate-fade-in" : "opacity-0 translate-y-8"
          )}
        >
          <div className="bg-surface border border-purple-border rounded-xl p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              ¿Quieres ver más código?
            </h3>
            <p className="text-text-secondary mb-6">
              Visita nuestro perfil de GitHub para explorar todos nuestros proyectos open source.
            </p>
            <Button 
              size="lg"
              className="bg-cyan text-white hover:bg-cyan/90"
              onClick={() => window.open('https://github.com/example', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              Ver GitHub Organization
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repository;