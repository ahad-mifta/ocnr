import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router";
import { CTA, SectionHeading } from "../components/Primitives";
import { ParticleVisual } from "../components/ParticleVisual";

export function CareersPage() {
  return (
    <>
      <section className="inner-hero careers-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumbs">Home / Careers</p>
            <p className="eyebrow">
              <span />
              Join the crew
            </p>
            <h1>
              Do work you are
              <br />
              <em>proud to own.</em>
            </h1>
            <p className="hero-intro">
              Join a thoughtful international team building products that matter—without the
              theatre.
            </p>
            <div className="button-row">
              <a className="button" href="#job-board">
                View job board
              </a>
              <Link className="button button-outline" to="/contact">
                Introduce yourself
              </Link>
            </div>
          </div>
          <ParticleVisual source="/assets/particles/careers.svg" />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading light eyebrow="Life at Oceanier" title="High standards. Human pace." />
          <div className="benefit-grid">
            {["Across continents", "Real ownership", "Room to grow", "Sane pace"].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>Autonomy with support, meaningful work and time to think deeply.</p>
              </div>
            ))}
          </div>
          <div className="perks">
            <span>Flexible hours</span>
            <span>Learning budget</span>
            <span>Remote friendly</span>
            <span>Home office support</span>
          </div>
        </div>
      </section>
      <section className="section section-dark" id="job-board">
        <div className="container">
          <SectionHeading
            eyebrow="Job board"
            title="Open roles will appear here."
            intro="We are not actively hiring for a specific position right now, but we are always interested in thoughtful people."
          />
          <div className="job-board-empty">
            <span>
              <BriefcaseBusiness />
            </span>
            <div>
              <p>No positions currently open</p>
              <h3>Do not wait for the perfect listing.</h3>
              <small>
                If Oceanier feels like the right place for your next chapter, introduce yourself and
                tell us what you would like to build.
              </small>
            </div>
            <Link to="/contact">
              Send an introduction <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
