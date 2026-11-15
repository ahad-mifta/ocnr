import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { Benefits, CTA, FAQ, SectionHeading } from "../components/Primitives";
import { services } from "../data/content";

export function ServicePage() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.slug === serviceId) ?? services[0];
  const Icon = service.icon;
  return (
    <>
      <section className="inner-hero service-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumbs">Home / Services / {service.title}</p>
            <p className="eyebrow">
              <span />
              {service.title}
            </p>
            <h1>
              {service.title} that turns ideas into <em>momentum.</em>
            </h1>
            <p className="hero-intro">
              {service.text} You keep the code, accounts and documentation—always.
            </p>
            <div className="button-row">
              <Link className="button" to="/contact">
                Discuss your project <ArrowRight size={18} />
              </Link>
              <Link className="button button-outline" to="/portfolio">
                See our work
              </Link>
            </div>
          </div>
          <div className="service-art">
            <Icon />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="What we deliver"
            title="From first decision to final handover."
          />
          <div className="deliver-grid">
            {service.items.map((item, i) => (
              <article key={item}>
                <span>0{i + 1}</span>
                <h3>{item}</h3>
                <p>
                  Focused scope, resilient engineering and a result your team can confidently own.
                </p>
                <Link to="/contact">
                  Explore this service <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container split-content">
          <div>
            <SectionHeading
              light
              eyebrow="Built around outcomes"
              title={`What is ${service.title.toLowerCase()}?`}
            />
            <p>
              It is more than a deliverable. It is a connected system of product decisions, user
              needs and robust technology designed to create lasting commercial value.
            </p>
            <p>
              We begin with the problem, reduce risk early, and create a practical route from
              concept to a reliable live product.
            </p>
          </div>
          <aside>
            <p className="eyebrow eyebrow-dark">
              <span />
              Quick facts
            </p>
            <dl>
              <div>
                <dt>Typical timeline</dt>
                <dd>8–16 weeks</dd>
              </div>
              <div>
                <dt>Core team</dt>
                <dd>4–7 specialists</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>Dedicated delivery</dd>
              </div>
            </dl>
            <Link className="button button-navy" to="/contact">
              Get a clear estimate
            </Link>
          </aside>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="How we create value" title="Capability at every layer." />
          <div className="capability-list">
            {[
              "Strategy that aligns the room",
              "Design that earns attention",
              "Engineering that stays dependable",
            ].map((x, i) => (
              <article key={x}>
                <div className="capability-visual">
                  <span>0{i + 1}</span>
                  <Icon />
                </div>
                <div>
                  <p className="eyebrow">
                    <span />
                    Capability 0{i + 1}
                  </p>
                  <h3>{x}</h3>
                  <p>
                    We connect the commercial goal to every design and technical decision, giving
                    your team a product that works now and adapts later.
                  </p>
                  {[
                    "Clear documented decisions",
                    "Weekly visible progress",
                    "Complete ownership and handover",
                  ].map((t) => (
                    <p className="check" key={t}>
                      <CheckCircle2 size={17} />
                      {t}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <SectionHeading light eyebrow="Why teams choose us" title="Built like a partnership." />
          <Benefits />
        </div>
      </section>
      <section className="section section-dark">
        <div className="container faq-layout">
          <SectionHeading
            eyebrow="Frequently asked"
            title={`Planning your ${service.title.toLowerCase()} project?`}
          />
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
