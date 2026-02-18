import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  Terminal, 
  Activity, 
  Award,
  Github,
  Twitter,
  Linkedin,
  LucideIcon
} from 'lucide-react';

// --- Types ---

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'neural' | 'system' | 'web' | 'crypto';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'live' | 'building' | 'archived';
  link: string;
  image?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
}

export interface SocialLink {
  platform: string;
  icon: LucideIcon;
  url: string;
  username: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  location: string;
  avatar: string;
  banner: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  stats: {
    commits: number;
    reputation: number;
    streak: number;
  };
  skills: Skill[];
  projects: Project[];
  badges: Badge[];
  socials: SocialLink[];
}

// --- Mock Data ---

export const PROFILE_DATA: UserProfile = {
  id: "user_0x1A4",
  name: "Alex Cipher",
  handle: "@neural_architect",
  role: "Senior AI Engineer",
  bio: "Architecting autonomous swarms and recursive neural networks. Building the singularity one commit at a time.",
  location: "Neo Tokyo, JP",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
  banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  level: 42,
  xp: 8450,
  nextLevelXp: 10000,
  stats: {
    commits: 12403,
    reputation: 98,
    streak: 142
  },
  skills: [
    { name: "TensorFlow", level: 98, category: "neural" },
    { name: "Rust", level: 92, category: "system" },
    { name: "Next.js", level: 88, category: "web" },
    { name: "Solidity", level: 76, category: "crypto" },
  ],
  projects: [
    {
      id: "p1",
      title: "Project Chimera",
      description: "Autonomous agent swarm for distributed computing tasks.",
      tags: ["Python", "AI", "P2P"],
      status: "live",
      link: "#"
    },
    {
      id: "p2",
      title: "DeepSynth V4",
      description: "Generative voice synthesis engine with <10ms latency.",
      tags: ["Rust", "WASM", "Audio"],
      status: "building",
      link: "#"
    }
  ],
  badges: [
    { id: "b1", name: "Bug Hunter", icon: Shield, color: "text-emerald-400", unlocked: true },
    { id: "b2", name: "Code Sprinter", icon: Zap, color: "text-amber-400", unlocked: true },
    { id: "b3", name: "Night Owl", icon: Activity, color: "text-indigo-400", unlocked: true },
    { id: "b4", name: "Architect", icon: Cpu, color: "text-purple-400", unlocked: false },
  ],
  socials: [
    { platform: "GitHub", icon: Github, url: "#", username: "cipher-0x" },
    { platform: "Twitter", icon: Twitter, url: "#", username: "@cipher_ai" },
    { platform: "LinkedIn", icon: Linkedin, url: "#", username: "Alex Cipher" },
    { platform: "Website", icon: Globe, url: "#", username: "cipher.ai" },
  ]
};