import { ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "react-router";
import { CTA } from "../components/Primitives";
import { articles } from "../data/content";
import { NotFoundPage } from "./NotFoundPage";

const sections = [
  {
    title: "Start with the problem, not the output",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lorem at sapien posuere fermentum. Curabitur non arcu sed justo malesuada luctus vitae id turpis.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    title: "Make the important decisions visible",
    paragraphs: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean feugiat, lacus sed facilisis vulputate, lectus mauris interdum sapien, sed tempor ipsum neque at erat.",
    ],
  },
  {
    title: "Build for learning and change",
    paragraphs: [
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum.",
      "Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper.",
    ],
  },
];

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;

  return (
    <>
      <article className="blog-article-page">
        <div className="container blog-article-hero">
          <Link to="/blog" className="blog-back-link">
            <ArrowLeft size={16} /> All insights
          </Link>
          <p className="eyebrow">
            <span />
            {article.category}
          </p>
          <h1>{article.title}</h1>
          <div className="blog-article-meta">
            <span>{article.date}</span>
            <span>
              <Clock size={14} /> {article.read} read
            </span>
          </div>
        </div>
        <div className="blog-article-cover">
          <img src={article.image} alt="" />
        </div>
        <div className="container blog-article-layout">
          <aside>
            <span>In this article</span>
            {sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.title}>
                0{index + 1} {section.title}
              </a>
            ))}
          </aside>
          <div className="blog-article-body">
            <p className="blog-lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. This article explores a
              practical way to make clearer product, design and engineering decisions.
            </p>
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <span>0{index + 1}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <blockquote>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit—clarity turns complexity into
              useful momentum.”
            </blockquote>
            <p>
              Aliquam erat volutpat. Suspendisse potenti. Vivamus sagittis lacus vel augue laoreet
              rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros.
            </p>
          </div>
        </div>
      </article>
      <CTA />
    </>
  );
}
