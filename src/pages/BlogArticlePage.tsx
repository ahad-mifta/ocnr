import { ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "react-router";
import { CTA } from "../components/Primitives";
import { articles } from "../data/content";
import { NotFoundPage } from "./NotFoundPage";

type ArticleBody = {
  lead: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  quote?: string;
  closing?: string;
};

const articleBodies: Record<string, ArticleBody> = {
  "designing-software-ready-to-scale": {
    lead: "Most early-stage software is built to survive the demo, not the deployment. When an initial product relies on synchronous request-response loops, monolithic database queries, and tightly coupled third-party webhooks, the moment product-market fit arrives can also be the moment the system collapses.",
    sections: [
      {
        title: 'The "MVP Trap"',
        paragraphs: [
          "VeloceOps, a B2B workflow and field-service automation platform, grew from 15,000 daily API calls to more than 1.8 million concurrent telemetry, dispatch, and billing events after signing three enterprise logistics clients in one quarter.",
          "Its launch-era architecture was a single Node.js and Express backend, a single relational database serving transactional writes and analytical reporting, synchronous third-party integrations, and shared tables with no resource quotas. It was inexpensive and fast to ship, but a 4,500-driver customer exposed the limits of every shortcut.",
          "Long-running dashboard queries exhausted the connection pool, a slow SMS gateway held API threads open until the server ran out of memory, a bulk import created a noisy-neighbor problem, and mobile retries caused duplicate dispatches and billing webhooks. The software had launched, but it was not equipped to scale.",
        ],
      },
      {
        title: "Diagnostic audit: identify the bottlenecks",
        paragraphs: [
          "Before changing the architecture, the team spent two weeks instrumenting distributed tracing and load testing every endpoint. The audit found four systemic issues: synchronous side effects blocked user-facing requests, reporting queries competed with transactional writes, direct updates allowed race conditions and duplicate actions, and shared compute allowed one tenant to degrade every other tenant's service.",
          "The lesson was simple: measure the failure modes before choosing the remedy. Observability made it possible to target the highest-risk paths instead of attempting a risky rewrite based on assumptions.",
        ],
      },
      {
        title: "The scaling architecture",
        paragraphs: [
          "The team used a phased strangler-fig migration rather than a big-bang rewrite. First, the API began validating state changes, publishing lightweight events to message queues, and returning 202 Accepted responses while worker pools handled notifications, billing synchronization, and route optimization asynchronously.",
          "Every mutating request received a client-generated idempotency key. Redis cached the key and response for 24 hours, so retries returned the original result without running business logic twice. Explicit state machines replaced blind updates, allowing only valid transitions such as PENDING to ASSIGNED to IN_TRANSIT to DELIVERED.",
          "Read replicas took reporting and export traffic away from the primary database. High-frequency GPS telemetry moved to partitioned time-series storage, with only the latest coordinates cached for live maps. Cursor-based pagination replaced deep OFFSET queries, keeping response times stable as datasets grew.",
          "Tenant-aware rate limits, fair queue partitioning, and composite indexes beginning with tenant_id prevented noisy neighbors. Expand-and-contract migrations, structured tracing, queue-lag monitoring, and SLO-driven autoscaling made future releases safer without maintenance windows.",
        ],
      },
      {
        title: "Implementation roadmap",
        paragraphs: [
          "Weeks one through three focused on visibility and stabilization: structured logging, distributed tracing, connection pooling, and composite tenant indexes. Weeks four through six moved webhooks, notifications, and invoice generation into worker queues with dead-letter monitoring.",
          "Weeks seven through nine split read and write workloads and offloaded telemetry. Weeks ten through twelve enforced idempotency across mobile endpoints and used synthetic chaos and load tests to simulate five times peak morning traffic.",
        ],
      },
      {
        title: "Measurable outcomes",
        paragraphs: [
          "Ninety days after the transition, VeloceOps onboarded two additional national logistics accounts and passed 4.5 million daily events with zero unplanned downtime. p99 API latency fell from 1,420ms to 220ms, peak capacity grew from roughly 85 to more than 2,400 requests per second, and peak primary-database CPU fell from 94% to 35%.",
          "Reliable retries raised webhook and notification delivery from 91.4% to 99.98%, while infrastructure cost per million events fell from $18.40 to $6.10.",
        ],
      },
      {
        title: "Key takeaways",
        paragraphs: [
          "Scaling does not require premature microservices or a Kubernetes cluster on day one. A modular monolith can go remarkably far when synchronous user requests are separated from asynchronous work, network calls are assumed to fail or duplicate, and the primary database is protected from heavy reads and transient telemetry.",
          "Measure unit economics alongside latency. True scalability means the cloud bill grows more slowly than customer revenue, not exponentially faster.",
        ],
      },
    ],
    quote:
      "Design boundaries, not premature microservices. Protect the primary database, make state transitions explicit, and build for the way distributed systems behave under pressure.",
  },
  "hidden-cost-wrong-feature": {
    lead: "There is a specific kind of tragedy in software development that rarely shows up in a post-mortem. The UI is crisp, the animations are smooth, the backend is clean, and everyone is proud of the craft. Three months after launch, nobody uses it.",
    sections: [
      {
        title: "The illusion of progress",
        paragraphs: [
          "The danger of building the wrong feature beautifully is that execution quality creates emotional attachment. After six weeks of pixel-perfect design, custom state management, and thorough QA, admitting that the feature should not exist feels like invalidating the team's best work.",
          "Teams respond by adding onboarding tours, another integration, or a marketing campaign instead of questioning the premise. Every hour spent rescuing a low-value feature compounds the original mistake.",
        ],
      },
      {
        title: "The five hidden costs",
        paragraphs: [
          "A polished but unvalidated feature consumes opportunity cost: the best engineers and designers are unavailable for core customer friction. It creates a permanent maintenance tax through endpoints, migrations, UI states, and tests that must live on forever.",
          "It also adds cognitive and UI bloat, documentation and support overhead, and strategic blindness. Clean performance metrics and a bug-free launch can hide the absence of customer traction while leadership mistakes shipping velocity for business momentum.",
        ],
      },
      {
        title: "Why smart teams fall into the polish trap",
        paragraphs: [
          "A loud request from one enterprise prospect can be mistaken for market demand. High-fidelity mockups can persuade stakeholders to admire a visual solution before asking whether the underlying problem is urgent enough to change daily habits.",
          "Teams also skip ugly proof of value. If customers will not engage with a manual report, a basic form, or a lightweight export, wrapping that same outcome in a bespoke dashboard will not change their behavior.",
        ],
      },
      {
        title: "Match craft to certainty",
        paragraphs: [
          "Start with problem validation before opening Figma: understand how often the problem occurs and how users solve it today. Then use a concierge or Wizard of Oz test to deliver the value manually for a small group.",
          "Next, ship a reliable functional thin slice and measure repeat organic usage. Only after telemetry shows that users rely on the feature and it moves activation, retention, or revenue should the team invest in full craft, scale, animations, and edge cases.",
        ],
      },
      {
        title: "Three questions before every sprint",
        paragraphs: [
          "What specific behavior will change if this succeeds? What is the cheapest way to prove someone wants it this week? If we build it and nobody uses it, how fast can we delete it?",
          "Great product teams are not defined only by how well they build. They are defined by the discipline to decide what deserves to be built well.",
        ],
      },
    ],
  },
  "automation-real-leverage": {
    lead: "When a company grows faster than its headcount, the instinct is almost always to hire. The problem is often not a lack of people; it is that smart humans are trapped doing robotic work.",
    sections: [
      {
        title: "The four high-leverage zones",
        paragraphs: [
          "The strongest automation opportunities sit directly on the path to customer value: the lead-to-onboarding handoff, tier-one triage and routing, cross-system data synchronization, and exception or SLA monitoring.",
          "Payment confirmation can provision a workspace and schedule kickoff automatically. AI can classify support intent and urgency before routing complex issues with context. Event-driven integrations can replace CSV exports, while watchdog workflows can alert the exact owner when an order, invoice, or customer request stalls.",
        ],
      },
      {
        title: "The human-in-the-loop sweet spot",
        paragraphs: [
          "The highest return usually sits between fully manual work and fully autonomous execution. Do not let an automated workflow send an unreviewed enterprise contract or issue a large refund blindly.",
          "Let the system gather usage history, draft the response, verify the calculations, and place a one-click approval card in Slack or an internal dashboard. Turning a 20-minute research task into a 15-second review delivers most of the speed gain without sacrificing judgment or trust.",
        ],
      },
      {
        title: "Three rules before automating",
        paragraphs: [
          "Never automate a broken process. Standardize unclear ownership, inconsistent inputs, and missing steps before wiring in automation.",
          "Target frequency over complexity: a simple task repeated 200 times a day creates more leverage than a 20-step workflow that happens once a quarter. Finally, build observability into every workflow with failure alerts, retry logic, and an audit log so people can trust the system.",
        ],
      },
      {
        title: "The bottom line",
        paragraphs: [
          "Growth should not mean drowning your best people in administrative glue work. Automate repetitive coordination, data movement, and routine triage so the team can focus on solving novel problems, talking to customers, and building better products.",
        ],
      },
    ],
  },
};

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;

  const body = articleBodies[article.slug];
  if (!body) return <NotFoundPage />;

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
            {body.sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.title}>
                {String(index + 1).padStart(2, "0")} {section.title}
              </a>
            ))}
          </aside>
          <div className="blog-article-body">
            <p className="blog-lead">{body.lead}</p>
            {body.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            {body.quote && <blockquote>“{body.quote}”</blockquote>}
            {body.closing && <p>{body.closing}</p>}
          </div>
        </div>
      </article>
      <CTA />
    </>
  );
}
