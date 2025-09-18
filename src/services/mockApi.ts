// Mock API service for the portfolio app
import projectAcademic from "@/assets/project-academic.jpg";
import projectIot from "@/assets/project-iot.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import avatarAna from "@/assets/avatar-ana.jpg";
import avatarCarlos from "@/assets/avatar-carlos.jpg";
import avatarMaria from "@/assets/avatar-maria.jpg";
import avatarDiego from "@/assets/avatar-diego.jpg";

export interface Project {
  id: string;
  title: string;
  cover: string;
  description: string;
  tags: string[];
  gallery: string[];
  links: {
    demo?: string;
    repo: string;
  };
}

export interface ProcessStep {
  id: number;
  title: string;
  media: {
    type: 'image' | 'video' | 'gif';
    src: string;
  };
  summary: string;
  links: Array<{
    title: string;
    url: string;
  }>;
}

export interface Process {
  steps: ProcessStep[];
}

export interface Repository {
  id: string;
  title: string;
  codeGif: string;
  resultGif: string;
  repoUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  links: {
    github?: string;
    linkedin?: string;
  };
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión Académica',
    cover: projectAcademic,
    description: 'Plataforma web para administrar estudiantes, cursos y calificaciones con interfaz moderna y responsive.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    gallery: [projectAcademic, projectAcademic],
    links: {
      demo: 'https://demo.example.com',
      repo: 'https://github.com/example/academic-system'
    }
  },
  {
    id: '2',
    title: 'App de Monitoreo IoT',
    cover: projectIot,
    description: 'Aplicación móvil para monitorear sensores IoT en tiempo real con dashboards interactivos.',
    tags: ['React Native', 'Python', 'MQTT', 'InfluxDB'],
    gallery: [projectIot],
    links: {
      repo: 'https://github.com/example/iot-monitor'
    }
  },
  {
    id: '3',
    title: 'E-commerce Sostenible',
    cover: projectEcommerce,
    description: 'Marketplace enfocado en productos eco-friendly con sistema de puntos de sustentabilidad.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    gallery: [projectEcommerce, projectEcommerce, projectEcommerce],
    links: {
      demo: 'https://eco-shop.example.com',
      repo: 'https://github.com/example/eco-commerce'
    }
  }
];

const mockProcess: Process = {
  steps: [
    {
      id: 1,
      title: 'Análisis',
      media: { type: 'image' as const, src: projectAcademic },
      summary: 'Investigación exhaustiva de requisitos, análisis de stakeholders y definición del alcance del proyecto. Identificamos oportunidades y riesgos para crear soluciones efectivas.',
      links: [
        { title: 'Metodología de análisis', url: '#' },
        { title: 'Plantillas de requisitos', url: '#' }
      ]
    },
    {
      id: 2,
      title: 'Diseño',
      media: { type: 'image' as const, src: projectEcommerce },
      summary: 'Creación de wireframes, prototipos interactivos y sistema de diseño. Definimos la arquitectura técnica y la experiencia de usuario óptima.',
      links: [
        { title: 'Sistema de diseño', url: '#' },
        { title: 'Prototipos Figma', url: '#' }
      ]
    },
    {
      id: 3,
      title: 'Desarrollo',
      media: { type: 'image' as const, src: projectIot },
      summary: 'Implementación ágil con sprints de 2 semanas. Desarrollo frontend y backend con testing continuo y revisiones de código.',
      links: [
        { title: 'Guías de desarrollo', url: '#' },
        { title: 'Estándares de código', url: '#' }
      ]
    },
    {
      id: 4,
      title: 'Testing',
      media: { type: 'image' as const, src: projectAcademic },
      summary: 'Pruebas unitarias, de integración y end-to-end. Testing de usabilidad y performance con usuarios reales.',
      links: [
        { title: 'Plan de testing', url: '#' },
        { title: 'Automatización QA', url: '#' }
      ]
    },
    {
      id: 5,
      title: 'Deploy',
      media: { type: 'image' as const, src: projectEcommerce },
      summary: 'Despliegue automático con CI/CD, monitoreo en producción y soporte post-lanzamiento. Documentación completa para el cliente.',
      links: [
        { title: 'Pipeline DevOps', url: '#' },
        { title: 'Documentación', url: '#' }
      ]
    }
  ]
};

const mockRepos: Repository[] = [
  {
    id: '1',
    title: 'React Dashboard',
    codeGif: '/placeholder.svg',
    resultGif: '/placeholder.svg',
    repoUrl: 'https://github.com/example/react-dashboard'
  },
  {
    id: '2',
    title: 'API REST Node.js',
    codeGif: '/placeholder.svg',
    resultGif: '/placeholder.svg',
    repoUrl: 'https://github.com/example/nodejs-api'
  },
  {
    id: '3',
    title: 'Mobile App Flutter',
    codeGif: '/placeholder.svg',
    resultGif: '/placeholder.svg',
    repoUrl: 'https://github.com/example/flutter-app'
  },
  {
    id: '4',
    title: 'ML Data Pipeline',
    codeGif: '/placeholder.svg',
    resultGif: '/placeholder.svg',
    repoUrl: 'https://github.com/example/ml-pipeline'
  }
];

const mockTeam: TeamMember[] = [
  {
    name: 'Ana García',
    role: 'Full Stack Developer',
    avatar: avatarAna,
    skills: ['React', 'Node.js', 'TypeScript'],
    links: {
      github: 'https://github.com/anagarcia',
      linkedin: 'https://linkedin.com/in/anagarcia'
    }
  },
  {
    name: 'Carlos López',
    role: 'DevOps Engineer',
    avatar: avatarCarlos,
    skills: ['Docker', 'AWS', 'Kubernetes'],
    links: {
      github: 'https://github.com/carloslopez',
      linkedin: 'https://linkedin.com/in/carloslopez'
    }
  },
  {
    name: 'María Rodríguez',
    role: 'UX/UI Designer',
    avatar: avatarMaria,
    skills: ['Figma', 'Adobe XD', 'Design Systems'],
    links: {
      github: 'https://github.com/mariarodriguez',
      linkedin: 'https://linkedin.com/in/mariarodriguez'
    }
  },
  {
    name: 'Diego Martínez',
    role: 'Data Scientist',
    avatar: avatarDiego,
    skills: ['Python', 'TensorFlow', 'SQL'],
    links: {
      github: 'https://github.com/diegomartinez',
      linkedin: 'https://linkedin.com/in/diegomartinez'
    }
  }
];

// Mock API functions
export const api = {
  getProjects: (): Promise<Project[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockProjects), 300)),
    
  getProcess: (): Promise<Process> => 
    new Promise(resolve => setTimeout(() => resolve(mockProcess), 600)),
    
  getRepositories: (): Promise<Repository[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockRepos), 700)),
    
  getTeam: (): Promise<TeamMember[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockTeam), 500)),
};