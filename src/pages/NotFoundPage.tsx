import { Compass } from "lucide-react";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="lost-ship">
        <Compass />
        <span>⌁ ⌁ ⌁ ⌁ ⌁</span>
      </div>
      <p className="eyebrow">
        <span />
        404 / Lost at sea
      </p>
      <h1>
        You have sailed
        <br />
        <em>off the map.</em>
      </h1>
      <p>The page may have moved, but the horizon is still clear.</p>
      <Link className="button" to="/">
        Back to home
      </Link>
    </section>
  );
}
