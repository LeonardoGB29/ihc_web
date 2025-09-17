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
  links: string[];
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

const mockProcess = {
  steps: [
    {
      id: 1,
      title: 'Análisis de Requerimientos',
      media: { type: 'image' as const, src: '/placeholder.svg' },
      summary: 'Identificación de necesidades del cliente y definición de objetivos del proyecto.',
      links: ['https://docs.example.com/analysis']
    },
    {
      id: 2,
      title: 'Diseño de Arquitectura',
      media: { type: 'image' as const, src: '/placeholder.svg' },
      summary: 'Creación de wireframes, mockups y definición de la arquitectura técnica.',
      links: ['https://figma.com/design-system']
    },
    {
      id: 3,
      title: 'Desarrollo Iterativo',
      media: { type: 'gif' as const, src: '/placeholder.svg' },
      summary: 'Implementación de funcionalidades siguiendo metodologías ágiles.',
      links: ['https://github.com/example/project']
    },
    {
      id: 4,
      title: 'Testing y QA',
      media: { type: 'video' as const, src: '/placeholder.svg' },
      summary: 'Pruebas unitarias, de integración y testing de usuario.',
      links: ['https://testing.example.com']
    },
    {
      id: 5,
      title: 'Despliegue y Monitoreo',
      media: { type: 'image' as const, src: '/placeholder.svg' },
      summary: 'Deploy en producción y configuración de monitoreo continuo.',
      links: ['https://monitoring.example.com']
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
    
  getProcess: (): Promise<typeof mockProcess> => 
    new Promise(resolve => setTimeout(() => resolve(mockProcess), 300)),
    
  getRepos: (): Promise<Repository[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockRepos), 300)),
    
  getTeam: (): Promise<TeamMember[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockTeam), 300)),
};