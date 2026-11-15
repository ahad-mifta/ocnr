import { createBrowserRouter } from "react-router";
import { SiteLayout } from "../components/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";
import { ServicePage } from "../pages/ServicePage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { AboutPage } from "../pages/AboutPage";
import { BlogPage } from "../pages/BlogPage";
import { CareersPage } from "../pages/CareersPage";
import { ContactPage } from "../pages/ContactPage";
import { LegalPage } from "../pages/LegalPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CaseStudyPage } from "../pages/CaseStudyPage";
import { BlogArticlePage } from "../pages/BlogArticlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "services/:serviceId", Component: ServicePage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "portfolio/:caseStudyId", Component: CaseStudyPage },
      { path: "about", Component: AboutPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogArticlePage },
      { path: "careers", Component: CareersPage },
      { path: "contact", Component: ContactPage },
      { path: "legal/:document", Component: LegalPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
