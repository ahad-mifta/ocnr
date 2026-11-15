import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { CTA } from "../components/Primitives";
import { articles } from "../data/content";
import { ParticleVisual } from "../components/ParticleVisual";

export function BlogPage() {
  const [query, setQuery] = useState("");
  const shown = articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <section className="inner-hero blog-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumbs">Home / Resources</p>
            <p className="eyebrow">
              <span />
              Resources
            </p>
            <h1>
              Ideas for the
              <br />
              <em>journey ahead.</em>
            </h1>
            <label className="search-box">
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights"
              />
            </label>
          </div>
          <ParticleVisual source="/assets/particles/blog.svg" />
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <article className="featured-post">
            <img src={articles[0].image} alt="Developer workspace" />
            <div>
              <span>Featured / {articles[0].category}</span>
              <h2>{articles[0].title}</h2>
              <p>
                Strong products do more than work today. Here is how to make foundational choices
                that keep options open for tomorrow.
              </p>
              <Link to={`/blog/${articles[0].slug}`}>
                Read the story <ArrowRight size={17} />
              </Link>
            </div>
          </article>
          <div className="filter-bar">
            <button className="active">All</button>
            <button>Engineering</button>
            <button>Product</button>
            <button>AI & Automation</button>
          </div>
          <div className="article-grid article-grid-light">
            {shown.map((a) => (
              <Link className="article-card" to={`/blog/${a.slug}`} key={a.title}>
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
      <CTA />
    </>
  );
}
