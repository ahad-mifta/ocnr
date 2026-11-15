import { Link, useParams } from "react-router";

export function LegalPage() {
  const { document } = useParams();
  const title =
    document === "privacy"
      ? "Privacy Policy"
      : document === "cookies"
        ? "Cookie Policy"
        : "Terms of Service";
  const sections = [
    "Overview",
    "Information we collect",
    "How we use information",
    "Your rights",
    "Data retention",
    "Contact",
  ];
  return (
    <section className="legal-page">
      <div className="container">
        <p className="breadcrumbs">Home / Legal / {title}</p>
        <h1>{title}</h1>
        <p className="muted">Last updated: 18 March 2026</p>
        <div className="legal-grid">
          <aside>
            {sections.map((s) => (
              <a href={`#${s.replace(/ /g, "-")}`} key={s}>
                {s}
              </a>
            ))}
          </aside>
          <article>
            {sections.map((s, i) => (
              <section id={s.replace(/ /g, "-")} key={s}>
                <span>0{i + 1}</span>
                <h2>{s}</h2>
                <p>
                  Oceanier is committed to clear, responsible practices. This section explains how
                  our agreement works, what information may be handled, and the choices available to
                  you.
                </p>
                <p>
                  We only collect and retain what is reasonably required to provide our services,
                  operate this website and meet legal obligations. We do not sell personal
                  information.
                </p>
              </section>
            ))}
            <p>
              Questions about this policy? <Link to="/contact">Contact our team.</Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
