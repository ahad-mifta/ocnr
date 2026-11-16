import emailjs from "@emailjs/browser";
import { ArrowRight, Mail, Paperclip, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCalEmbed } from "../components/CalEmbed";

const EMAILJS_SERVICE_ID = "service_cvxz9fm";
const EMAILJS_PUBLIC_KEY = "DEjXqyg_gn2ZE1nh6";
const EMAILJS_LEAD_TEMPLATE_ID = "template_0f07aafa";
const EMAILJS_CLIENT_TEMPLATE_ID = "template_9oig4yf";
const EMAIL_LOGO_URL = "https://oceanier.com/assets/oceanier-logo-light.png";

type ContactDetails = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  summary: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}

function createEmailHtml(details: ContactDetails, type: "client" | "lead") {
  const isClient = type === "client";
  const title = isClient ? "Thanks for reaching out" : "New project enquiry";
  const intro = isClient
    ? `Hi ${escapeHtml(details.name)}, we have received your enquiry and will be in touch within one business day.`
    : `${escapeHtml(details.name)} has submitted a new project enquiry.`;
  const rows = [
    ["Name", details.name],
    ["Company", details.company || "Not provided"],
    ["Email", details.email],
    ["Phone", details.phone || "Not provided"],
    ["Primary service", details.service],
    ["Project summary", details.summary],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;color:#6b7d88;font-size:12px;vertical-align:top;width:30%;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding:12px 0;color:#102b3f;font-size:14px;line-height:1.55;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="margin:0;background:#eef3f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102b3f;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d5e0e5;border-radius:12px;overflow:hidden;">
        <div style="padding:28px 32px;background:#00233a;">
          <img src="${EMAIL_LOGO_URL}" alt="Oceanier" width="160" style="display:block;width:160px;height:auto;" />
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 8px;color:#719500;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">${isClient ? "Project enquiry" : "New lead"}</p>
          <h1 style="margin:0 0 16px;color:#102b3f;font-size:28px;line-height:1.2;">${title}</h1>
          <p style="margin:0 0 24px;color:#526775;font-size:15px;line-height:1.6;">${intro}</p>
          <table style="width:100%;border-collapse:collapse;border-top:1px solid #d5e0e5;">${rows}</table>
          <p style="margin:28px 0 0;color:#526775;font-size:13px;line-height:1.6;">Oceanier · New York · Dhaka<br /><a href="mailto:hello@oceanier.com" style="color:#719500;">hello@oceanier.com</a></p>
        </div>
      </div>
    </div>`;
}

async function sendContactEmails(details: ContactDetails) {
  const sharedParams = {
    name: details.name,
    to_name: details.name,
    from_name: "Oceanier",
    company: details.company,
    email: details.email,
    user_email: details.email,
    phone: details.phone,
    service: details.service,
    summary: details.summary,
    reply_to: details.email,
  };

  await Promise.all([
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_LEAD_TEMPLATE_ID,
      {
        ...sharedParams,
        to_email: "hello@oceanier.com",
        subject: `New project enquiry from ${details.name}`,
        message: createEmailHtml(details, "lead"),
        html_content: createEmailHtml(details, "lead"),
      },
      EMAILJS_PUBLIC_KEY,
    ),
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CLIENT_TEMPLATE_ID,
      {
        ...sharedParams,
        to_email: details.email,
        subject: "We received your Oceanier enquiry",
        message: createEmailHtml(details, "client"),
        html_content: createEmailHtml(details, "client"),
      },
      EMAILJS_PUBLIC_KEY,
    ),
  ]);
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  useCalEmbed("inline", {
    elementOrSelector: "#my-cal-inline-secret",
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "auto" },
    calLink: "oceanier/quick-chat",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const value = (name: string) => String(formData.get(name) || "").trim();
    const details: ContactDetails = {
      name: value("name"),
      company: value("company"),
      email: value("email"),
      phone: value("phone"),
      service: value("service"),
      summary: value("summary"),
    };

    try {
      await sendContactEmails(details);
      setSent(true);
    } catch (error) {
      console.error("Contact form email delivery failed", error);
      setSubmitError(
        "We couldn't send your enquiry right now. Please try again or email hello@oceanier.com.",
      );
    } finally {
      setSubmitting(false);
    }
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
      <section className="section section-light booking-section">
        <div className="container contact-panel booking-panel">
          <div className="contact-panel-head">
            <div>
              <p className="eyebrow eyebrow-dark">
                <span />
                Direct meeting
              </p>
              <h2>Book a 30-minute intro.</h2>
            </div>
            <p>Choose a time that works for you. No hard sell, just a useful first conversation.</p>
          </div>
          <div
            id="my-cal-inline-secret"
            className="booking-calendar"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
          />
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
                  <select required defaultValue="" name="service">
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
                  <textarea
                    required
                    rows={5}
                    name="summary"
                    placeholder="The challenge, outcome or idea..."
                  />
                </label>
                <div className="form-actions">
                  <button className="button button-navy" type="submit" disabled={submitting}>
                    {submitting ? "Sending enquiry..." : "Send enquiry"}{" "}
                    {!submitting && <ArrowRight size={18} />}
                  </button>
                </div>
                {submitError && <p className="form-error">{submitError}</p>}
              </form>
            )}
            <aside className="contact-side">
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
