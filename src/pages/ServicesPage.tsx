import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  Benefits,
  CTA,
  FAQ,
  ProcessBlock,
  SectionHeading,
  ServiceGrid,
} from "../components/Primitives";
import { ParticleVisual } from "../components/ParticleVisual";

export function ServicesPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumbs">Home / Services</p>
            <p className="eyebrow">
              <span />
              What we do
            </p>
            <h1>
              Everything you need to <em>build and scale.</em>
            </h1>
            <p className="hero-intro">
              Strategy, design and engineering, connected by one accountable senior team.
            </p>
            <div className="button-row">
              <Link className="button" to="/contact">
                Start your project <ArrowRight size={18} />
              </Link>
              <a className="button button-outline" href="#disciplines">
                Browse services <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <ParticleVisual source="/assets/particles/services.svg" />
        </div>
      </section>
      <section className="section section-dark" id="disciplines">
        <div className="container">
          <SectionHeading
            eyebrow="Our disciplines"
            title="One voyage. Every capability."
            intro="Choose a starting point. We’ll connect the rest around your goal."
          />
          <ServiceGrid detailed />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading light eyebrow="Why Oceanier" title="Senior thinking. Clear ownership." />
          <Benefits />
        </div>
      </section>
      <section className="stats">
        <div className="container stats-grid">
          {[
            ["7+", "Years building"],
            ["24", "Core services"],
            ["110+", "Products delivered"],
            ["100%", "Code ownership"],
          ].map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Our process" title="Progress you can see." />
          <ProcessBlock />
        </div>
      </section>
      <section className="section section-light">
        <div className="container faq-layout">
          <div>
            <SectionHeading light eyebrow="Before we start" title="Questions, answered." />
          </div>
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
