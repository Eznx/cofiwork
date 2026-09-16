// ==================================================
// TIPOS GENERALES DEL SITIO
// ==================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  tag: string;
  description: string;
  image: string;
}

export interface ProcessStep {
  n: string;
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  price: string;
  maintenance: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}
