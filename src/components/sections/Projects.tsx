import { useState, useEffect } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api, Project } from "@/services/mockApi";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const allTags = ['all', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const filteredProjects = selectedTag === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(selectedTag));

  if (loading) {
    return (
      <section className="py-20">
        <div className="space-y-8">
          <div className="h-8 bg-purple-translucent rounded animate-pulse"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-surface border border-purple-border rounded-xl p-6 space-y-4">
                <div className="aspect-video bg-purple-translucent rounded-lg animate-pulse"></div>
                <div className="h-6 bg-purple-translucent rounded animate-pulse"></div>
                <div className="h-20 bg-purple-translucent rounded animate-pulse"></div>
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
        <div>
          <h2 className="text-4xl font-bold text-text-primary mb-4">Proyectos</h2>
          <p className="text-text-secondary text-lg mb-8">
            Explora nuestros proyectos más destacados y las tecnologías implementadas.
          </p>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-smooth border",
                  selectedTag === tag
                    ? "bg-purple text-white border-cyan"
                    : "bg-purple-translucent text-text-secondary border-purple-border hover:text-text-primary hover:bg-purple/10"
                )}
              >
                {tag === 'all' ? 'Todos' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="group bg-surface border border-purple-border rounded-xl overflow-hidden hover:shadow-elevated transition-smooth hover:border-cyan/30"
            >
              {/* Project Cover */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.cover} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-4">
                  <div className="flex gap-2">
                    {project.links.demo && (
                      <Button size="sm" className="bg-cyan text-white hover:bg-cyan/90">
                        <Eye className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-purple-border bg-purple-translucent">
                      <Github className="w-4 h-4 mr-2" />
                      Código
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-text-primary group-hover:text-cyan transition-smooth">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="bg-purple-translucent text-text-secondary border-purple-border text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-2">
                  {project.links.demo && (
                    <Button 
                      size="sm" 
                      className="bg-cyan text-white hover:bg-cyan/90 flex-1"
                      onClick={() => window.open(project.links.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Demo
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-border bg-purple-translucent hover:bg-purple/10 flex-1"
                    onClick={() => window.open(project.links.repo, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Repositorio
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              No se encontraron proyectos para el filtro seleccionado.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;