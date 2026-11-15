import { ArrowRight, Calendar, Mail, Paperclip, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <section className="inner-hero contact-hero">
        <div className="container">
          <p className="breadcrumbs">Home / Contact</p>
          <p className="eyebrow">
            <span />
            Start a conversation
          </p>
          <h1>
            Let’s build something
            <br />
            <em>great together.</em>
          </h1>
          <p className="hero-intro">
            Tell us where you want to go. We will come back to you within one business day.
          </p>
        </div>
      </section>
      <section className="next-steps">
        <div className="container">
          {[
            "We read your brief",
            "You hear back in a day",
            "A short intro call",
            "A written proposal",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <p>{x}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-light contact-section">
        <div className="container contact-panel">
          <div className="contact-panel-head">
            <div>
              <p className="eyebrow eyebrow-dark">
                <span />
                Project enquiry
              </p>
              <h2>Share the essentials.</h2>
            </div>
            <p>
              Fields marked <b>*</b> are required. Your information stays confidential.
            </p>
          </div>
          <div className="contact-grid">
            {sent ? (
              <div className="success-state">
                <div className="paper-boat">△</div>
                <p className="eyebrow eyebrow-dark">
                  <span />
                  Message sent
                </p>
                <h2>Your idea is on its way.</h2>
                <p>Thank you. A member of our team will reply within one business day.</p>
                <button className="button button-navy" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-heading">
                  <span>01</span>
                  <div>
                    <h3>About you</h3>
                    <p>How should we get in touch?</p>
                  </div>
                </div>
                <div className="field-row">
                  <label className="professional-field">
                    <span>Full name *</span>
                    <input required name="name" placeholder="e.g. Alex Morgan" />
                  </label>
                  <label className="professional-field">
                    <span>Company</span>
                    <input name="company" placeholder="Your organisation" />
                  </label>
                </div>
                <div className="field-row">
                  <label className="professional-field">
                    <span>Work email *</span>
                    <input required type="email" name="email" placeholder="alex@company.com" />
                  </label>
                  <label className="professional-field">
                    <span>Phone number</span>
                    <input type="tel" name="phone" placeholder="+00 000 000 000" />
                  </label>
                </div>
                <div className="form-divider">
                  <span>02</span>
                  <div>
                    <h3>About the project</h3>
                    <p>A little context helps us prepare.</p>
                  </div>
                </div>
                <label className="professional-field professional-field-full">
                  <span>Primary service *</span>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>UI/UX Design</option>
                    <option>Cloud & DevOps</option>
                    <option>Automation & AI</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="professional-field professional-field-full">
                  <span>Project summary *</span>
                  <textarea required rows={5} placeholder="The challenge, outcome or idea..." />
                </label>
                <div className="form-actions">
                 
                  <button className="button button-navy" type="submit">
                    Send enquiry <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
            <aside className="contact-side">
              <div className="book-card">
                <Calendar />
                <p className="eyebrow eyebrow-dark">
                  <span />
                  Prefer to talk?
                </p>
                <h3>Book a 30-minute intro.</h3>
                <p>Pick a time that works. No hard sell, just a useful first conversation.</p>
                <a href="mailto:hello@oceanier.com">
                  Choose a time <ArrowRight size={16} />
                </a>
              </div>
              <a href="mailto:hello@oceanier.com">
                <Mail />
                hello@oceanier.com
              </a>
              <a href="tel:+8801518936946">
                <Phone />
                +880 1518 936 946
              </a>
            </aside>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <p className="eyebrow">
            <span />
            Our offices
          </p>
          <div className="office-cards">
            <article>
              <span>United States</span>
              <h2>New York, US</h2>
              <p>
                <a href="tel:+19297836102">+1 929 783-6102</a>
                <br />
                <a href="mailto:newyork@oceanier.com">newyork@oceanier.com</a>
              </p>
              <a href="mailto:newyork@oceanier.com">
                Contact New York <ArrowRight size={15} />
              </a>
            </article>
            <article>
              <span>Bangladesh</span>
              <h2>Dhaka, Bangladesh</h2>
              <p>
                <a href="tel:+8801518936946">+880 1518 936 946</a>
                <br />
                <a href="mailto:dhaka@oceanier.com">dhaka@oceanier.com</a>
              </p>
              <a href="mailto:dhaka@oceanier.com">
                Contact Dhaka <ArrowRight size={15} />
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
