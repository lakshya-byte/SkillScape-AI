import { Zap, Shield, Globe, Cpu } from 'lucide-react';

export type BillingCycle = 'monthly' | 'yearly';

export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean; // The trigger for "God Mode" styling
  glowColor?: string; // Custom accent color for the glow
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: { monthly: 0, yearly: 0 },
    description: 'Essential neural queries for hobbyists and students exploring the basics.',
    features: [
      'Basic neural queries',
      '2 Personal Projects',
      'Community Support',
      'API Access (Read-only)'
    ],
    cta: 'Start Free',
    glowColor: 'gray'
  },
  {
    id: 'builder',
    name: 'Builder',
    price: { monthly: 49, yearly: 39 }, // $39/mo if billed yearly
    description: 'For professional developers building advanced neural applications.',
    features: [
      'Advanced neural queries',
      'Unlimited Projects',
      'Full API Access (10k req/m)',
      'Priority Email Support',
      'Model Fine-tuning (Basic)'
    ],
    cta: 'Select Builder',
    popular: true, // This Card will be THE HERO
    glowColor: 'purple'
  },
  {
    id: 'architect',
    name: 'Architect',
    price: { monthly: 199, yearly: 159 },
    description: 'Scale your team with dedicated GPU resources and collaboration.',
    features: [
      'Everything in Builder',
      'Team Collaboration (5 seats)',
      'Dedicated GPU Access',
      'SSO Integration',
      'Advanced Analytics Dashboard'
    ],
    cta: 'Select Architect',
    glowColor: 'indigo'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: { monthly: 0, yearly: 0 }, // Custom pricing logic
    description: 'Full enterprise-grade security and on-premise deployment options.',
    features: [
      'On-premise Deployment',
      'Audit Logs & Compliance',
      '24/7 Dedicated Support',
      '99.99% SLA Guarantee',
      'Unlimited Fine-tuning'
    ],
    cta: 'Contact Sales',
    glowColor: 'emerald'
  }
];

export const TRUSTED_LOGOS = [
  { name: "ACME Corp", icon: Shield },
  { name: "Orbit.ai", icon: Globe },
  { name: "Nexus", icon: Cpu },
  { name: "FluxStream", icon: Zap },
  { name: "Loop", icon: Globe },
];