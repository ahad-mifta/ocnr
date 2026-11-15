import { ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { process, services } from "../data/content";

export function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`eyebrow ${dark ? "" : "eyebrow-dark"}`}>
      <span />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="section-heading">
      <Eyebrow dark={!light}>{eyebrow}</Eyebrow>
      <h2 className={light ? "ink" : ""}>{title}</h2>
      {intro && <p className={light ? "ink-soft" : "muted"}>{intro}</p>}
    </div>
  );
}

export function ArrowLink({
  to,
  children,
  inverted = false,
}: {
  to: string;
  children: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <Link className={`text-link ${inverted ? "text-link-dark" : ""}`} to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}

export function ServiceGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`service-grid ${detailed ? "service-grid-large" : ""}`}>
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Link className="service-card reveal" to={`/services/${service.slug}`} key={service.slug}>
            <div className="service-visual">
              <img src={service.image} alt="" />
              <span className="service-icon">
                <Icon />
              </span>
              <span className="service-arrow">
                <ArrowRight />
              </span>
            </div>
            <div className="service-copy">
              <span className="card-index">0{index + 1}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </div>
            {detailed && (
              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    {item}
                    <ArrowRight size={15} />
                  </li>
                ))}
              </ul>
            )}
            {!detailed && <span className="explore">Discover capability</span>}
          </Link>
        );
      })}
    </div>
  );
}

const projectOutcomes = [
  {
    quote:
      "Existing CCTV became live floor intelligence, helping restaurants turn tables 18–22% faster without additional sensors.",
    name: "TablePulse AI",
    role: "Hospitality automation",
    initials: "TP",
  },
  {
    quote:
      "One purpose-built backend now manages damaged properties from initial intake through restoration and sale.",
    name: "Fire-Sale Properties",
    role: "PropTech marketplace",
    initials: "FS",
  },
  {
    quote:
      "A warm, high-trust experience turned complex voice AI into a clear early-access journey for seniors and families.",
    name: "Evoca Labs",
    role: "AgeTech and senior care",
    initials: "EL",
  },
  {
    quote:
      "A flexible packaging architecture made new core and seasonal cider releases easier to scale without losing recognition.",
    name: "Brick River Cider Co.",
    role: "Craft beverage packaging",
    initials: "BR",
  },
  {
    quote:
      "A unified brand, investor narrative and digital flagship shifted conversations from explaining cryptography to enterprise adoption.",
    name: "Qubit Shield",
    role: "Post-quantum security",
    initials: "QS",
  },
];

export function TestimonialMarquee() {
  const cards = [...projectOutcomes, ...projectOutcomes];
  return (
    <section className="review-section" aria-label="Real project outcomes">
      <div className="review-heading container">
        <Eyebrow dark={false}>Project outcomes</Eyebrow>
        <h2>Real work. Visible operational change.</h2>
        <p>Outcome signals drawn from the case studies.</p>
      </div>
      <div className="review-viewport">
        <div className="review-track">
          {cards.map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <div className="review-stars">CASE STUDY OUTCOME</div>
              <blockquote>{review.quote}</blockquote>
              <div className="review-author">
                <span>{review.initials}</span>
                <div>
                  <b>{review.name}</b>
                  <small>{review.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessBlock() {
  return (
    <div className="process-route">
      <div className="route-line" />
      {process.map(([number, title, text, time]) => (
        <article className="process-step" key={number}>
          <div className="port">
            <span>{number}</span>
          </div>
          <p className="mono">{time}</p>
          <h3>{title}</h3>
          <p className="muted">{text}</p>
        </article>
      ))}
    </div>
  );
}

const questions = [
  [
    "How long does an MVP take?",
    "Most focused MVPs launch in 8–14 weeks. We confirm scope, risks and milestones before development starts.",
  ],
  [
    "Will we own the source code?",
    "Completely. You own the code, accounts, documentation and infrastructure from day one. No lock-in.",
  ],
  [
    "Can you work with our existing team?",
    "Yes. We can lead a delivery or add senior product, design and engineering capability to your existing team.",
  ],
  [
    "What happens after launch?",
    "We offer measured support, monitoring and product iterations—or hand everything over cleanly to your team.",
  ],
  [
    "How do we communicate?",
    "You have direct access to the people doing the work, with a shared workspace and clear weekly progress reviews.",
  ],
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {questions.map(([q, a], index) => (
        <div className={`faq-item ${open === index ? "open" : ""}`} key={q}>
          <button
            aria-expanded={open === index}
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            <span>{q}</span>
            <Plus size={20} />
          </button>
          <div className="faq-answer">
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <section className="cta-band">
      <div className="ship-watermark">OCEANIER</div>
      <div>
        <Eyebrow dark={false}>Your next chapter</Eyebrow>
        <h2>
          Ready to make
          <br />
          waves?
        </h2>
      </div>
      <div className="cta-side">
        <p>
          Bring us the challenge. We’ll bring the clarity, craft and engineering to move it forward.
        </p>
        <Link className="button button-navy" to="/contact">
          Start your project <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Benefits() {
  const items = [
    "Direct access to your team",
    "Full product lifecycle",
    "Agile and transparent",
    "Built to scale",
  ];
  return (
    <div className="benefit-grid">
      {items.map((item, i) => (
        <div key={item}>
          <span>0{i + 1}</span>
          <Check size={20} />
          <h3>{item}</h3>
          <p>
            Clear ownership, senior attention and decisions made with your long-term success in
            mind.
          </p>
        </div>
      ))}
    </div>
  );
}
