import { ArrowRight, ChevronLeft, ChevronRight, Expand, ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Benefits, CTA, SectionHeading } from "../components/Primitives";
import { projects } from "../data/content";
import { ParticleVisual } from "../components/ParticleVisual";

const galleryModules = import.meta.glob(
  "../assets/portfolio-gallery/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const brandingGalleryModules = import.meta.glob(
  "../assets/branding-gallery/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const createGalleryItems = (modules: Record<string, string>, fallbackLabel: string) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
      const filename =
        path
          .split("/")
          .pop()
          ?.replace(/\.[^.]+$/, "") ?? fallbackLabel;
      return {
        src,
        label: filename
          .replace(/^\d+[-_\s]*/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      };
    });

const galleryItems = createGalleryItems(galleryModules, "Website work");
const brandingGalleryItems = createGalleryItems(brandingGalleryModules, "Branding work");
type GalleryType = "branding" | "ui";

const getRandomPreviewIndices = (length: number, previous: number[] = []) => {
  const indices = Array.from({ length }, (_, index) => index);
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[randomIndex]] = [indices[randomIndex], indices[index]];
  }
  const next = indices.slice(0, 3);

  if (length > 3 && next.every((index, position) => index === previous[position])) {
    [next[0], next[1]] = [next[1], next[0]];
  }

  return next;
};

export function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const [activeGallery, setActiveGallery] = useState<GalleryType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [brandingPreviewIndices, setBrandingPreviewIndices] = useState(() =>
    getRandomPreviewIndices(brandingGalleryItems.length),
  );
  const [uiPreviewIndices, setUiPreviewIndices] = useState(() =>
    getRandomPreviewIndices(galleryItems.length),
  );
  const filters = ["All", "AI", "Automation", "Brand", "Web", "UX", "Packaging", "Product"];
  const shown = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));
  const activeGalleryItems = activeGallery === "branding" ? brandingGalleryItems : galleryItems;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBrandingPreviewIndices((previous) =>
        getRandomPreviewIndices(brandingGalleryItems.length, previous),
      );
      setUiPreviewIndices((previous) => getRandomPreviewIndices(galleryItems.length, previous));
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (galleryIndex === null || activeGalleryItems.length === 0) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryIndex(null);
        setActiveGallery(null);
      }
      if (event.key === "ArrowRight") {
        setGalleryIndex((galleryIndex + 1) % activeGalleryItems.length);
      }
      if (event.key === "ArrowLeft") {
        setGalleryIndex((galleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGallery, activeGalleryItems.length, galleryIndex]);

  const moveGallery = (direction: number) => {
    if (galleryIndex === null) return;
    setGalleryIndex(
      (galleryIndex + direction + activeGalleryItems.length) % activeGalleryItems.length,
    );
  };

  const openGallery = (type: GalleryType, index = 0) => {
    setActiveGallery(type);
    setGalleryIndex(index);
  };

  const closeGallery = () => {
    setGalleryIndex(null);
    setActiveGallery(null);
  };

  return (
    <>
      <section className="inner-hero portfolio-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumbs">Home / Portfolio</p>
            <p className="eyebrow">
              <span />
              Our work
            </p>
            <h1>
              Work that drives
              <br />
              <em>real growth.</em>
            </h1>
            <p className="hero-intro">
              A selection of products made with brave teams and clear commercial intent.
            </p>
            <div className="hero-stats">
              {[
                ["110+", "Products"],
                ["20+", "Engineers"],
                ["12", "Industries"],
                ["99.9%", "Uptime"],
              ].map((x) => (
                <span key={x[1]}>
                  <b>{x[0]}</b>
                  {x[1]}
                </span>
              ))}
            </div>
          </div>
          <ParticleVisual source="/assets/particles/portfolio.svg" />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <div className="filter-bar">
            {filters.map((f) => (
              <button className={f === filter ? "active" : ""} onClick={() => setFilter(f)} key={f}>
                {f}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {shown.map((p, i) => (
              <article className="portfolio-card" key={p.title}>
                <Link
                  className="project-image"
                  to={p.href}
                  aria-label={`View ${p.title} case study`}
                >
                  <img src={p.image} alt={`${p.title} case study`} />
                  <span>View</span>
                </Link>
                <div className="portfolio-meta">
                  <p>
                    0{i + 1} / {p.sector} / {p.year}
                  </p>
                  <h2>{p.title}</h2>
                  <div>
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p>{p.summary}</p>
                  <Link to={p.href}>
                    View case study <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <section className="work-gallery-callout ui-gallery-callout">
            <div className="gallery-callout-copy">
              <p className="eyebrow eyebrow-dark">
                <span />
                Portfolio gallery
              </p>
              <h2>Explore our Branding and Designing works.</h2>
              <p></p>
              <button
                className="button button-navy"
                onClick={() => openGallery("branding")}
                disabled={brandingGalleryItems.length === 0}
              >
                Open branding gallery <Expand size={17} />
              </button>
            </div>
            {brandingGalleryItems.length > 0 ? (
              <div className="ui-gallery-previews">
                {brandingPreviewIndices.map((itemIndex, cardIndex) => {
                  const item = brandingGalleryItems[itemIndex];
                  return (
                    <button
                      className="gallery-preview-card-fade"
                      key={`${item.src}-${cardIndex}`}
                      onClick={() => openGallery("branding", itemIndex)}
                    >
                      <img src={item.src} alt="" />
                      <span>
                        {item.label} <Expand size={14} />
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="ui-gallery-empty">
                <ImagePlus />
                <strong>Gallery folder ready</strong>
                <p>
                  Add work images to <code>src/assets/branding-gallery/</code>
                </p>
              </div>
            )}
          </section>

          <section className="work-gallery-callout ui-gallery-callout">
            <div className="gallery-callout-copy">
              <p className="eyebrow eyebrow-dark">
                <span />
                Portfolio gallery
              </p>
              <h2>Explore our website & app UI/UX works.</h2>
              <p></p>
              <button
                className="button button-navy"
                onClick={() => openGallery("ui")}
                disabled={galleryItems.length === 0}
              >
                Open UI gallery <Expand size={17} />
              </button>
            </div>
            {galleryItems.length > 0 ? (
              <div className="ui-gallery-previews">
                {uiPreviewIndices.map((itemIndex, cardIndex) => {
                  const item = galleryItems[itemIndex];
                  return (
                    <button
                      className="gallery-preview-card-fade"
                      key={`${item.src}-${cardIndex}`}
                      onClick={() => openGallery("ui", itemIndex)}
                    >
                      <img src={item.src} alt="" />
                      <span>
                        {item.label} <Expand size={14} />
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="ui-gallery-empty">
                <ImagePlus />
                <strong>Gallery folder ready</strong>
                <p>
                  Add work images to <code>src/assets/portfolio-gallery/</code>
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Why Oceanier"
            title="The work is yours. The momentum is shared."
          />
          <Benefits />
        </div>
      </section>
      <CTA />
      {galleryIndex !== null && activeGalleryItems[galleryIndex] && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            activeGallery === "branding" ? "Portfolio branding gallery" : "Portfolio UI gallery"
          }
        >
          <div className="gallery-lightbox-bar">
            <div>
              <span>
                {activeGallery === "branding" ? "Branding and design work" : "Website UI work"}
              </span>
              <p>
                {String(galleryIndex + 1).padStart(2, "0")} /{" "}
                {String(activeGalleryItems.length).padStart(2, "0")} ·{" "}
                {activeGalleryItems[galleryIndex].label}
              </p>
            </div>
            <button onClick={closeGallery} aria-label="Close gallery">
              <X />
            </button>
          </div>
          <div className="portfolio-gallery-scroll">
            <div>
              <img
                key={activeGalleryItems[galleryIndex].src}
                src={activeGalleryItems[galleryIndex].src}
                alt={activeGalleryItems[galleryIndex].label}
              />
            </div>
          </div>
          <div className="gallery-lightbox-nav">
            <button onClick={() => moveGallery(-1)} aria-label="Previous gallery item">
              <ChevronLeft /> Previous
            </button>
            <div>
              {activeGalleryItems.map((item, index) => (
                <button
                  key={item.src}
                  className={index === galleryIndex ? "active" : ""}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`View ${item.label}`}
                />
              ))}
            </div>
            <button onClick={() => moveGallery(1)} aria-label="Next gallery item">
              Next <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
