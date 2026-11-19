import { useEffect } from "react";
import { useLocation } from "react-router";
import { articles, services } from "../data/content";
import { caseStudies } from "../data/caseStudies";

const siteName = "Oceanier";
const defaultDescription =
  "Oceanier is a digital solutions agency designing and engineering websites, mobile apps, cloud platforms and business systems for ambitious businesses.";
const socialImage = "https://www.oceanier.com/assets/oceanier-logo-light.png";

function setMeta(selector: string, attr: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, selector);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function Seo() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const segments = path.split("/").filter(Boolean);
    let title = `${siteName} | Digital Agency for Websites, Apps & Cloud`;
    let description = defaultDescription;

    if (segments[0] === "contact") {
      title = `Contact Oceanier | Start a Project`;
      description =
        "Tell Oceanier about your website, app, cloud platform or digital product. We respond within one business day.";
    } else if (segments[0] === "services") {
      const service = segments[1]
        ? services.find((item) => item.slug === segments[1])
        : undefined;
      title = service ? `${service.title} | Oceanier` : "Digital Services | Oceanier";
      description = service
        ? `${service.text} Oceanier delivers focused strategy, design and engineering for ambitious businesses.`
        : "Explore Oceanier web development, mobile apps, design, data, cloud, automation and business systems.";
    } else if (segments[0] === "portfolio") {
      const study = segments[1]
        ? caseStudies.find((item) => item.slug === segments[1])
        : undefined;
      title = study ? `${study.client} Case Study | Oceanier` : "Portfolio | Oceanier";
      description = study ? study.summary : "See how Oceanier designs and builds digital products and systems.";
    } else if (segments[0] === "about") {
      title = "About Oceanier | Digital Agency";
      description =
        "Meet Oceanier, a design and engineering agency building reliable digital products for businesses around the world.";
    } else if (segments[0] === "blog") {
      const article = segments[1]
        ? articles.find((item) => item.slug === segments[1])
        : undefined;
      title = article ? `${article.title} | Oceanier` : "Insights & Ideas | Oceanier";
      description = article
        ? `Read ${article.title}, a practical insight from the Oceanier team.`
        : "Practical ideas from Oceanier about product strategy, software engineering, design, AI and business growth.";
    } else if (segments[0] === "careers") {
      title = "Careers at Oceanier";
      description = "Explore career opportunities and life at Oceanier.";
    } else if (segments[0] === "legal") {
      const documentName =
        segments[1] === "privacy"
          ? "Privacy Policy"
          : segments[1] === "cookies"
            ? "Cookie Policy"
            : "Terms of Service";
      title = `${documentName} | Oceanier`;
      description = `Read Oceanier’s ${documentName.toLowerCase()}.`;
    }

    const url = `https://www.oceanier.com${path}`;
    document.title = title;

    setMeta("description", "name", "description", description);
    setMeta("robots", "name", "robots", "index, follow");
    setMeta("og:title", "property", "og:title", title);
    setMeta("og:description", "property", "og:description", description);
    setMeta("og:url", "property", "og:url", url);
    setMeta("og:type", "property", "og:type", "website");
    setMeta("og:site_name", "property", "og:site_name", siteName);
    setMeta("og:image", "property", "og:image", socialImage);
    setMeta("twitter:card", "name", "twitter:card", "summary_large_image");
    setMeta("twitter:title", "name", "twitter:title", title);
    setMeta("twitter:description", "name", "twitter:description", description);
    setMeta("twitter:image", "name", "twitter:image", socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [location.pathname]);

  return null;
}
