export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  category: "web" | "mobile" | "backend" | "fullstack";
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  image?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
