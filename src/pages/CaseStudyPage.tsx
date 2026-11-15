import { ArrowDown, ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router";
import { CTA } from "../components/Primitives";
import { caseStudies, type CaseMedia } from "../data/caseStudies";
import { NotFoundPage } from "./NotFoundPage";

function CaseMediaAsset({ media, featured = false }: { media: CaseMedia; featured?: boolean }) {
  if (media.type === "video") {
    return (
      <video
        className={featured ? "featured" : ""}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        controls
        playsInline
        aria-label={media.alt}
      />
    );
  }

  return <img className={featured ? "featured" : ""} src={media.src} alt={media.alt} />;
}

export function CaseStudyPage() {
  const { caseStudyId } = useParams();
  const study = caseStudies.find((item) => item.slug === caseStudyId);
  if (!study) return <NotFoundPage />;

  const [leadMedia, ...supportingMedia] = study.media;
  const pageStyle = { "--case-accent": study.accent } as CSSProperties;

  return (
    <div className="case-page" style={pageStyle}>
      <section className="case-hero">
        <img className="case-hero-image" src={study.heroImage} alt={study.heroAlt} />
        <div className="case-hero-overlay" />
        <div className="container case-hero-content">
          <p className="breadcrumbs">Home / Portfolio / {study.client}</p>
          <div className="case-tags">
            <span>{study.industry}</span>
            <span>{study.year}</span>
          </div>
          <h1>{study.headline}</h1>
          <p>{study.intro}</p>
          <div className="button-row">
            {study.website && (
              <a className="button" href={study.website} target="_blank" rel="noreferrer">
                Visit live site <ExternalLink size={17} />
              </a>
            )}
            <a className="button button-outline" href="#story">
              Read the story <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="case-meta">
        <div className="container">
          <div>
            <span>Client</span>
            <strong>{study.client}</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>{study.industry}</strong>
          </div>
          <div>
            <span>Scope</span>
            <strong>{study.services}</strong>
          </div>
          <div>
            <span>Core promise</span>
            <strong>{study.corePromise}</strong>
          </div>
        </div>
      </section>

      <section className="section section-light" id="story">
        <div className="container case-story-grid">
          <div className="case-story-label">
            <span>01 / The challenge</span>
            <ShieldCheck />
          </div>
          <div className="case-story-copy">
            <p className="eyebrow eyebrow-dark">
              <span />
              The problem
            </p>
            <h2>{study.problemTitle}</h2>
            <p>{study.problemIntro}</p>
            <div className="case-problem-grid">
              {study.problems.map((problem, index) => (
                <article key={problem.title}>
                  <span>0{index + 1}</span>
                  <h3>{problem.title}</h3>
                  <p>{problem.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-belief">
        <div className="container">
          <p>How we think</p>
          <blockquote>“{study.belief}”</blockquote>
          <p>{study.beliefText}</p>
        </div>
      </section>

      <section className="section section-light case-solutions">
        <div className="container">
          <div className="case-section-head">
            <p className="eyebrow eyebrow-dark">
              <span />
              The solution
            </p>
            <h2>{study.solutionHeading}</h2>
          </div>
          <div className="case-solution-list">
            {study.solutions.map((solution, index) => (
              <article key={solution.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{solution.title}</h3>
                  <p>{solution.text}</p>
                </div>
                <ul>
                  {solution.details.map((detail) => (
                    <li key={detail}>
                      <Check size={15} /> {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-media-showcase">
        <div className="container">
          <div className="case-media-head">
            <div>
              <p>02 / Working system</p>
              <h2>{study.mediaHeading}</h2>
            </div>
            <p>{study.mediaIntro}</p>
          </div>
          <div className="case-lead-media">
            <CaseMediaAsset media={leadMedia} featured />
          </div>
          {supportingMedia.length > 0 && (
            <div className="case-image-pair">
              {supportingMedia.map((media) => (
                <CaseMediaAsset media={media} key={media.src} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-light case-impact">
        <div className="container">
          <div className="case-section-head">
            <p className="eyebrow eyebrow-dark">
              <span />
              Business impact
            </p>
            <h2>{study.impactHeading}</h2>
          </div>
          <div className="case-impact-grid">
            {study.impacts.map((impact) => (
              <article key={impact.title}>
                <span>{impact.label}</span>
                <h3>{impact.title}</h3>
                <p>{impact.text}</p>
              </article>
            ))}
          </div>
          <div className="case-next">
            <p>{study.closing}</p>
            <Link to="/contact">
              Start a project like this <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}
