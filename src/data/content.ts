import {
  AppWindow,
  BarChart3,
  Bot,
  Cloud,
  Database,
  Palette,
  PanelsTopLeft,
  Smartphone,
} from "lucide-react";
import { portfolioProjects } from "./caseStudies";

export const services = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: AppWindow,
    text: "Fast, accessible web products engineered to convert.",
    items: ["Custom websites", "SaaS platforms", "E-commerce"],
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    icon: Smartphone,
    text: "Native-quality experiences for every screen.",
    items: ["iOS applications", "Android applications", "Cross-platform apps"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "design",
    title: "Design",
    icon: Palette,
    text: "Human-centred systems that make complex things clear.",
    items: ["UI/UX design", "Product design", "Brand identity"],
    image:
      "https://images.unsplash.com/photo-1576153192396-180ecef2a715?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    icon: BarChart3,
    text: "Turn raw signals into confident business decisions.",
    items: ["Business intelligence", "Custom dashboards", "Predictive analytics"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "backend-infrastructure",
    title: "Backend & Infrastructure",
    icon: Database,
    text: "Secure foundations ready for real-world scale.",
    items: ["API development", "Microservices", "Database design"],
    image:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "business-systems",
    title: "CRM & Business Systems",
    icon: PanelsTopLeft,
    text: "Purpose-built tools that make operations flow.",
    items: ["Custom CRM", "ERP development", "Inventory systems"],
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    icon: Cloud,
    text: "Reliable delivery pipelines and resilient cloud estates.",
    items: ["Cloud hosting", "CI/CD pipelines", "Cloud migration"],
    image:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "automation-ai",
    title: "Automation & AI",
    icon: Bot,
    text: "Practical intelligence that frees teams to do more.",
    items: ["AI integration", "Workflow automation", "Chatbots"],
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?auto=format&fit=crop&w=1200&q=85",
  },
];

export const projects = portfolioProjects;

export const articles = [
  {
    slug: "designing-software-ready-to-scale",
    category: "Engineering",
    date: "14 Mar 2026",
    title: "Designing software that is ready to scale, not just launch",
    read: "10 min",
    image:
      "https://images.unsplash.com/photo-1625838144804-300f3907c110?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "hidden-cost-wrong-feature",
    category: "Product",
    date: "02 Mar 2026",
    title: "The hidden cost of building the wrong feature beautifully",
    read: "7 min",
    image:
      "https://images.unsplash.com/photo-1681949103006-70066fb25dfe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "automation-real-leverage",
    category: "AI & Automation",
    date: "21 Feb 2026",
    title: "Where automation creates real leverage for growing teams",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?auto=format&fit=crop&w=1000&q=80",
  },
];

export const process = [
  ["01", "Discovery", "We align on the problem, users and commercial outcome.", "1–2 weeks"],
  ["02", "Architecture", "A pragmatic roadmap with clear technical decisions.", "1–2 weeks"],
  ["03", "Build", "Small releases, visible progress and direct collaboration.", "4–16 weeks"],
  ["04", "Quality", "Performance, security and usability tested as one.", "Ongoing"],
  ["05", "Launch & scale", "A calm release, full handover and support that lasts.", "Long-term"],
];
