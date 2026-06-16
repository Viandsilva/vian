export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  techStack: string[];
  role: string;
  timeline: string;
  liveUrl?: string;
  codeSnippet?: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  mockupType: 'terminal' | 'compiler' | 'editor';
}

export interface BlogPost {
  title: string;
  category: string;
  publishDate: string;
  readTime: string;
  summary: string;
  content: string;
  slug: string;
  featured?: boolean;
}

export type Theme = 'dark' | 'light';
export type ActivePage = 'home' | 'projects' | 'blog' | 'pricing' | 'contact';
