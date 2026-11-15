import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { CTA, SectionHeading } from "../components/Primitives";
import { ParticleVisual } from "../components/ParticleVisual";

const teamImg =
  "https://images.unsplash.com/photo-1681949287382-052ea3954a51?auto=format&fit=crop&w=1400&q=85";
const workshop =
  "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=1200&q=85";
export function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div className="container">
          <div className="inner-hero-grid about-hero-grid">
            <div>
              <p className="breadcrumbs">Home / About</p>
              <p className="eyebrow">
                <span />
                Our story
              </p>
              <h1>
                The engineering of
                <br />
                <em>a new standard.</em>
              </h1>
              <p className="hero-intro">
                We believe defining the right problem is half the solution. The other half is a team
                that cares enough to build it properly.
              </p>
            </div>
            <ParticleVisual source="/assets/particles/about.svg" />
          </div>
          <div className="about-images">
            <img src={teamImg} alt="Oceanier team collaborating" />
            <img src={workshop} alt="Product workshop" />
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container story-grid">
          <strong>
            7+<span> years</span>
          </strong>
          <div>
            <SectionHeading
              light
              eyebrow="Experience, combined"
              title="Built on craft. Moved by curiosity."
            />
            <p>
              Oceanier brings together experienced product strategists, designers and engineers
              across Europe and Asia. We formed around one belief: great software comes from precise
              thinking, honest collaboration and care for the details users never see.
            </p>
            <p>
              We choose efficient engineering over hype. Every system is designed to create freedom,
              not dependency.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="One team, two shores"
            title="Global context. Shared standards."
          />
          <div className="office-map">
            <div className="map-line" />
            <article>
              <span>US</span>
              <h3>New York, USA</h3>
              <p>Strategy, consulting and architecture oversight.</p>
              <small>40.7128° N · 74.0060° E</small>
            </article>
            <article>
              <span>AS</span>
              <h3>Dhaka, Bangladesh</h3>
              <p>Core development and rapid product execution.</p>
              <small>23.8103° N · 90.4125° E</small>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-light philosophy">
        <div className="container">
          <blockquote>
            “Software is not magic. It is engineering—with empathy, discipline and a destination.”
          </blockquote>
          <div className="principle-grid">
            {["100% source code ownership", "No vendor lock-in", "Synchronized growth"].map(
              (x, i) => (
                <article key={x}>
                  <span>0{i + 1}</span>
                  <h3>{x}</h3>
                  <p>Your product remains portable, understandable and completely yours.</p>
                </article>
              ),
            )}
          </div>
          <Link className="button button-navy" to="/contact">
            Build with us <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
