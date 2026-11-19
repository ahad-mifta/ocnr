import { ArrowUp, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { services } from "../data/content";
import { Seo } from "./Seo";

const links = [
  ["Services", "/services"],
  ["About", "/about"],
  ["Portfolio", "/portfolio"],
  ["Blog", "/blog"],
  ["Career", "/careers"],
];

export function SiteLayout() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-shell">
      <Seo />
      <div
        className="scroll-progress"
        style={{
          transform: `scaleX(${Math.min(1, (typeof window !== "undefined" ? window.scrollY : 0) / 4000)})`,
        }}
      />
      <header className={scrolled ? "scrolled" : ""}>
        <Link to="/" className="logo" aria-label="Oceanier home">
          <img src="/assets/oceanier-logo-dark.png" alt="Oceanier" />
        </Link>
        <nav className="desktop-nav">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
         
          <Link className="button button-small" to="/contact">
            Let's talk
          </Link>
        </div>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
          <Menu />
        </button>
      </header>
      <div className={`mobile-menu ${menu ? "active" : ""}`}>
        <button aria-label="Close menu" onClick={() => setMenu(false)}>
          <X />
        </button>
        <nav>
          {links.map(([label, href]) => (
            <NavLink key={href} to={href}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <p>
          hello@oceanier.com
          <br />
          New York · Dhaka
        </p>
      </div>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-lead">
          <p>Let’s sail together</p>
          <Link className="button" to="/contact">
            Tell us your idea
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/oceanier-logo-dark.png" alt="Oceanier" />
            <p>We are a digital solutions agency that designs, builds and scales websites, mobile apps and cloud platforms for ambitious businesses around the world.</p>
            <div className="footer-offices">
              <div>
                <small>United States</small>
                <strong>New York, US</strong>
                <a href="tel:+19297836102">+1 929 783-6102</a>
                <a href="mailto:newyork@oceanier.com">newyork@oceanier.com</a>
              </div>
              <div>
                <small>Bangladesh</small>
                <strong>Dhaka, Bangladesh</strong>
                <a href="tel:+8801518936946">+880 1518 936 946</a>
                <a href="mailto:dhaka@oceanier.com">dhaka@oceanier.com</a>
              </div>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            {links.slice(1).map(([l, h]) => (
              <Link to={h} key={h}>
                {l}
              </Link>
            ))}
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-services">
            <h4>Expertise</h4>
            {services.map((s) => (
              <Link to={`/services/${s.slug}`} key={s.slug}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h4>Stay in the current</h4>
            <p className="muted">Monthly ideas on products, systems and growth.</p>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <input
                aria-label="Email for newsletter"
                type="email"
                placeholder="Work email"
                required
              />
              <button aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Oceanier. All rights reserved.</span>
          <div>
            <Link to="/legal/terms">Terms</Link>
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/cookies">Cookies</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <ArrowUp size={16} /> Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
