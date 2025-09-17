import { useState, useEffect } from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api, TeamMember } from "@/services/mockApi";

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await api.getTeam();
        setTeam(data);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="space-y-8">
          <div className="h-8 bg-purple-translucent rounded animate-pulse"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-surface border border-purple-border rounded-xl p-6 space-y-4">
                <div className="w-20 h-20 bg-purple-translucent rounded-full animate-pulse"></div>
                <div className="h-6 bg-purple-translucent rounded animate-pulse"></div>
                <div className="h-4 bg-purple-translucent rounded animate-pulse"></div>
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
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Nuestro Equipo</h2>
          <p className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto">
            Conoce a los profesionales que hacen posible cada proyecto, 
            combinando experiencia técnica con pasión por la innovación.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div 
              key={index}
              className="group bg-surface border border-purple-border rounded-xl p-6 hover:shadow-elevated transition-smooth hover:border-cyan/30 transform hover:-translate-y-1"
              style={{
                transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
              }}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-purple-border group-hover:border-cyan transition-smooth">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1/2 transform translate-x-6 w-4 h-4 bg-cyan border-2 border-surface rounded-full"></div>
              </div>

              {/* Member Info */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-cyan transition-smooth">
                  {member.name}
                </h3>
                
                <p className="text-sm text-text-secondary font-medium">
                  {member.role}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.slice(0, 2).map(skill => (
                    <Badge 
                      key={skill}
                      variant="secondary" 
                      className="bg-purple-translucent text-text-secondary border-purple-border text-xs px-2 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 2 && (
                    <Badge 
                      variant="secondary" 
                      className="bg-cyan-translucent text-cyan border-cyan/30 text-xs px-2 py-1"
                    >
                      +{member.skills.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-2 justify-center pt-2">
                  {member.links.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-9 h-9 p-0 border-purple-border bg-purple-translucent hover:bg-purple/10 hover:border-cyan/50"
                      onClick={() => window.open(member.links.github, '_blank')}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {member.links.linkedin && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-9 h-9 p-0 border-purple-border bg-purple-translucent hover:bg-purple/10 hover:border-cyan/50"
                      onClick={() => window.open(member.links.linkedin, '_blank')}
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Hover overlay with all skills */}
              <div className="absolute inset-0 bg-surface/95 border border-cyan rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-center items-center">
                <h4 className="text-sm font-semibold text-text-primary mb-2">Especialidades</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.map(skill => (
                    <Badge 
                      key={skill}
                      className="bg-purple text-white text-xs px-2 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="mt-3 bg-cyan text-white hover:bg-cyan/90"
                  onClick={() => window.open(member.links.linkedin || member.links.github, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Conectar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          <div className="bg-surface border border-purple-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-purple mb-2">{team.length}</div>
            <div className="text-sm text-text-secondary">Integrantes</div>
          </div>
          <div className="bg-surface border border-purple-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-cyan mb-2">15+</div>
            <div className="text-sm text-text-secondary">Proyectos</div>
          </div>
          <div className="bg-surface border border-purple-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-purple mb-2">3</div>
            <div className="text-sm text-text-secondary">Años exp.</div>
          </div>
          <div className="bg-surface border border-purple-border rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-cyan mb-2">100%</div>
            <div className="text-sm text-text-secondary">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;