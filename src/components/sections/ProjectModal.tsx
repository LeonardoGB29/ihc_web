import { useState } from "react";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/services/mockApi";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="bg-surface border border-purple-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-elevated motion-reduce:transition-none animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-border">
          <h2 className="text-xl font-bold text-text-primary">{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-micro p-1 rounded-md hover:bg-purple-translucent focus:ring-2 focus:ring-cyan"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="relative mb-6">
              <img 
                src={project.gallery[currentImageIndex]} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {project.gallery.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 text-text-primary p-2 rounded-full transition-micro focus:ring-2 focus:ring-cyan"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 text-text-primary p-2 rounded-full transition-micro focus:ring-2 focus:ring-cyan"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-micro ${
                          index === currentImageIndex 
                            ? 'bg-cyan' 
                            : 'bg-text-secondary/50 hover:bg-text-secondary'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-text-secondary mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-purple-translucent text-purple border border-purple-border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.links.demo && (
              <Button 
                onClick={() => window.open(project.links.demo, '_blank')}
                className="bg-purple hover:bg-purple/90 text-white transition-micro motion-reduce:transition-none"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Demo
              </Button>
            )}
            <Button 
              onClick={() => window.open(project.links.repo, '_blank')}
              variant="outline"
              className="border-purple-border bg-purple-translucent hover:bg-purple/10 text-text-primary transition-micro motion-reduce:transition-none"
            >
              <Github className="w-4 h-4 mr-2" />
              Ver Repositorio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;