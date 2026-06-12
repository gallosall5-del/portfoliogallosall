import type { IconType } from 'react-icons';
import {
  FaReact, FaAngular, FaNodeJs, FaPhp, FaLaravel, FaSymfony,
  FaGitAlt, FaGithub, FaGitlab, FaDatabase, FaHtml5, FaCss3Alt,
  FaMobileAlt, FaServer, FaCode, FaRobot, FaBrain, FaPalette,
  FaEnvelope, FaPhone, FaLinkedin, FaChartBar
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiFlutter,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiPostman,
  SiSwagger
} from 'react-icons/si';

export interface Skill {
  name: string;
  icon: IconType;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: IconType;
  skills: Skill[];
  gradient: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  techs: string[];
  features: string[];
  github: string;
  demo: string;
  image: string;
  gradient: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconType;
  gradient: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  gradient: string;
}

export interface ContactInfo {
  icon: IconType;
  label: string;
  value: string;
  href: string;
}

export const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Formation', href: '#education' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const heroRoles = [
  'Développeur Full Stack',
  'Développeur Mobile',
  'Développeur Backend',
  "Passionné d'Intelligence Artificielle",
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: FaPalette,
    gradient: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'HTML5', icon: FaHtml5, level: 90 },
      { name: 'CSS3', icon: FaCss3Alt, level: 88 },
      { name: 'JavaScript', icon: SiJavascript, level: 85 },
      { name: 'TypeScript', icon: SiTypescript, level: 80 },
      { name: 'React', icon: FaReact, level: 85 },
      { name: 'Angular', icon: FaAngular, level: 70 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 88 },
    ],
  },
  {
    title: 'Backend',
    icon: FaServer,
    gradient: 'from-violet-500 to-purple-400',
    skills: [
      { name: 'PHP', icon: FaPhp, level: 85 },
      { name: 'Laravel', icon: FaLaravel, level: 82 },
      { name: 'Symfony', icon: FaSymfony, level: 70 },
      { name: 'Node.js', icon: FaNodeJs, level: 75 },
    ],
  },
  {
    title: 'Mobile',
    icon: FaMobileAlt,
    gradient: 'from-cyan-500 to-blue-400',
    skills: [
      { name: 'Flutter', icon: SiFlutter, level: 80 },
    ],
  },
  {
    title: 'Bases de données',
    icon: FaDatabase,
    gradient: 'from-emerald-500 to-teal-400',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, level: 82 },
      { name: 'MySQL', icon: SiMysql, level: 85 },
      { name: 'MongoDB', icon: SiMongodb, level: 70 },
      { name: 'SQLite', icon: SiSqlite, level: 78 },
    ],
  },
  {
    title: 'Outils',
    icon: FaCode,
    gradient: 'from-orange-500 to-amber-400',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 88 },
      { name: 'GitHub', icon: FaGithub, level: 90 },
      { name: 'Postman', icon: SiPostman, level: 85 },
      { name: 'Swagger', icon: SiSwagger, level: 78 },
      { name: 'GitLab', icon: FaGitlab, level: 75 },
    ],
  },
  {
    title: 'API & IA',
    icon: FaBrain,
    gradient: 'from-pink-500 to-rose-400',
    skills: [
      { name: 'API REST', icon: FaServer, level: 88 },
      { name: "Intégration d'API", icon: FaCode, level: 85 },
      { name: 'Chatbots IA', icon: FaRobot, level: 70 },
      { name: 'Fonctionnalités IA', icon: FaBrain, level: 68 },
    ],
  },
];

export const services: Service[] = [
  {
    title: 'Développement Web',
    description: "Création d'applications web modernes, performantes et responsive avec React, Angular et les dernières technologies frontend.",
    icon: FaCode,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Développement Mobile',
    description: "Conception d'applications mobiles cross-platform élégantes et fluides avec Flutter pour iOS et Android.",
    icon: FaMobileAlt,
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    title: 'Développement Backend',
    description: "Architecture et développement de serveurs robustes et scalables avec Laravel, Symfony et Node.js.",
    icon: FaServer,
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    title: "Conception d'API",
    description: "Design et implémentation d'API REST sécurisées, bien documentées et performantes avec Swagger.",
    icon: FaDatabase,
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    title: 'Tableaux de bord',
    description: "Création de dashboards interactifs et visuellement riches pour la visualisation et l'analyse de données.",
    icon: FaChartBar,
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    title: "Intégration d'IA",
    description: "Intégration de chatbots intelligents et de fonctionnalités basées sur l'intelligence artificielle dans vos applications.",
    icon: FaRobot,
    gradient: 'from-cyan-500 to-blue-400',
  },
];

export const projects: Project[] = [
  {
    title: 'Teranga GESCRIM',
    description: "Système de gestion de la criminalité pour la Direction de la Sécurité Publique du Sénégal.",
    longDescription: "Application complète de gestion de la criminalité comprenant un dashboard analytique, une gestion territoriale multi-niveaux, et une application mobile pour les opérations de terrain.",
    techs: ['React', 'Laravel', 'Flutter', 'PostgreSQL', 'Tailwind CSS'],
    features: [
      'Dashboard analytique avec graphiques interactifs',
      'Gestion territoriale multi-niveaux',
      'Application mobile de terrain',
      'Système de rôles et permissions',
      'Export de rapports PDF/Excel',
    ],
    github: 'https://github.com/gallosall5-del',
    demo: '#',
    image: '',
    gradient: 'from-blue-600 to-violet-600',
  },
  {
    title: 'Portfolio Personnel',
    description: 'Portfolio web premium développé avec React, TypeScript et Framer Motion.',
    longDescription: "Portfolio professionnel avec animations sophistiquées, mode sombre/clair, glassmorphism et design responsive pour une expérience utilisateur premium.",
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Animations fluides avec Framer Motion',
      'Mode sombre et clair',
      'Design responsive premium',
      'Glassmorphism moderne',
    ],
    github: 'https://github.com/gallosall5-del',
    demo: '#',
    image: '',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'EGL Company',
    description: "Application mobile e-commerce de vente de produits alimentaires frais.",
    longDescription: "Plateforme e-commerce (viandes, œufs, charcuteries) avec paiement sécurisé et livraison rapide. Commandez en ligne, parcourez les articles en vedette et suivez vos achats. Disponible sur iOS et Android.",
    techs: ['Flutter', 'Node.js', 'API REST'],
    features: [
      'Catalogue de produits frais',
      'Paiement en ligne sécurisé',
      'Suivi de livraison en temps réel',
      'Déployé sur Play Store et App Store',
    ],
    github: 'https://github.com/gallosall5-del',
    demo: '#',
    image: '',
    gradient: 'from-orange-500 to-red-500',
  },
];

export const education: Education[] = [
  {
    degree: "BTS Développement d'Applications Mobile",
    school: 'Institut Supérieur de Technologie',
    period: '2024 - 2026',
    description: "Formation intensive en développement d'applications mobiles couvrant Flutter, React Native, la conception d'API et les méthodologies agiles.",
    gradient: 'from-blue-500 to-violet-500',
  },
];

export const contactInfo: ContactInfo[] = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'gallosall5@gmail.com',
    href: 'mailto:gallosall5@gmail.com',
  },
  {
    icon: FaPhone,
    label: 'Téléphone',
    value: '+221 70 820 48 68',
    href: 'tel:+221708204868',
  },
  {
    icon: FaPhone,
    label: 'Téléphone 2',
    value: '+221 78 316 10 35',
    href: 'tel:+221783161035',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'gallosall5-del',
    href: 'https://github.com/gallosall5-del',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Gallo Sall',
    href: 'https://www.linkedin.com/in/gallo-sall-27873b354',
  },
];
