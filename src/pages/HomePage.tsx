import { ArrowDown, ArrowRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { articles, projects } from "../data/content";
import {
  CTA,
  FAQ,
  ProcessBlock,
  SectionHeading,
  ServiceGrid,
  TestimonialMarquee,
} from "../components/Primitives";

const ParticleShip = lazy(() =>
  import("../components/ParticleShip").then((module) => ({ default: module.ParticleShip })),
);

const trustedLogos = [
  ["A Vac Dif", "/assets/clients/a-vac-dif.svg"],
  ["Baseline", "/assets/clients/baseline.svg"],
  ["Buddd", "/assets/clients/buddd.svg"],
  ["Carolina", "/assets/clients/carolina.svg"],
  ["Daita", "/assets/clients/daita.svg"],
  ["F5", "/assets/clients/f5.svg"],
  ["Firesale", "/assets/clients/firesale.svg"],
  ["Greg's Pier", "/assets/clients/gregs-pier.svg"],
  ["Hemy", "/assets/clients/hemy.svg"],
  ["Nico", "/assets/clients/nico.svg"],
  ["Pilkin", "/assets/clients/pilkin.svg"],
  ["QubitShield", "/assets/clients/qubit-shield.svg"],
  ["Rose", "/assets/clients/rose.svg"],
  ["Speed House", "/assets/clients/spd.svg"],
  ["Ultra", "/assets/clients/ultra.svg"],
  ["Vista", "/assets/clients/vista.svg"],
  ["Capstan", "/assets/clients/capstan.svg"],
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            Anchor. Sail. Conquer.
          </p>
          <h1>
            Navigate the
            <br />
            digital sea with <em>confidence.</em>
          </h1>
          <p className="hero-intro">
            Oceanier is a digital solutions agency of designers, engineers and strategists who turn
            ideas into products people love.
          </p>
          <div className="button-row">
            <Link className="button" to="/contact">
              Book a Free Consultation <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" to="/portfolio">
              View our work
            </Link>
          </div>
        </div>
        <div className="ship-scene" aria-hidden="true">
          <Suspense fallback={<div className="particle-stage particle-loading" />}>
            <ParticleShip paused={false} />
          </Suspense>
          <div className="sand-sea sand-sea-one" />
          <div className="sand-sea sand-sea-two" />
        </div>
        <div className="hero-bottom">
          <a href="#expertise">
            Scroll <ArrowDown size={15} />
          </a>
          <div>
            <span>
              <b>7+</b> years
            </span>
            <span>
              <b>110+</b> launches
            </span>
            <span>
              <b>5</b> continents
            </span>
          </div>
        </div>
      </section>

      <section className="trusted">
        <span>Trusted by businesses around the globe</span>
        <div className="trusted-viewport">
          <div className="logo-marquee">
            {[...trustedLogos, ...trustedLogos].map(([name, src], index) => (
              <div className="trusted-logo" key={`${name}-${index}`}>
                <img src={src} alt={index < trustedLogos.length ? name : ""} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="expertise">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Expertise for every stage."
            intro="From first sketch to millions of users, one senior team stays with the whole journey."
          />
          <ServiceGrid />
        </div>
      </section>

      <section className="section section-light work-section">
        <div className="container">
          <div className="heading-row">
            <SectionHeading
              light
              eyebrow="Selected work"
              title="Made to move business."
              intro="Digital products with a reason to exist and results you can measure."
            />
            <Link className="button button-navy work-section-button" to="/portfolio">
              View all work <ArrowRight size={17} />
            </Link>
          </div>
          <div className="project-grid">
            {projects.slice(0, 3).map((project, i) => (
              <Link
                to={project.href}
                className={`project-card project-${i + 1}`}
                key={project.title}
              >
                <div className="project-image">
                  <img src={project.image} alt={`${project.title} digital product`} />
                  <span>View</span>
                </div>
                <div>
                  <p>
                    0{i + 1} / {project.sector} / {project.year}
                  </p>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section performance">
        <div className="container performance-grid">
          <div>
            <p className="eyebrow">
              <span />
              Built to perform
            </p>
            <h2>
              Calm on the surface.
              <br />
              Powerful underneath.
            </h2>
          </div>
          <div className="performance-list">
            {["Realtime collaboration", "Enterprise-grade security", "Advanced analytics"].map(
              (x, i) => (
                <article key={x}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{x}</h3>
                    <p>Designed into the foundation, not added as an afterthought.</p>
                  </div>
                  <div className="mini-viz">
                    <i />
                    <i />
                    <i />
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {[
            ["110+", "Products launched"],
            ["99.9%", "Uptime target"],
            ["20+", "Senior specialists"],
            ["5.0", "Client rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark process-section">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="A clear route to launch."
            intro="No black box. Five visible stages, one shared destination."
          />
          <ProcessBlock />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Field notes" title="Ideas for building better." />
          <div className="article-grid">
            {articles.map((a) => (
              <Link to={`/blog/${a.slug}`} className="article-card" key={a.title}>
                <div>
                  <img src={a.image} alt="" />
                  <span>{a.category}</span>
                </div>
                <p>
                  {a.date} · {a.read}
                </p>
                <h3>{a.title}</h3>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialMarquee />

      <section className="section section-dark">
        <div className="container faq-layout">
          <div>
            <SectionHeading eyebrow="Common questions" title="Clarity before we begin." />
            <Link className="button button-outline" to="/contact">
              Ask us anything
            </Link>
          </div>
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
