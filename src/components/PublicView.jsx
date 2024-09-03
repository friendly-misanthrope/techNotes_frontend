import { Link } from "react-router-dom";

const PublicView = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to
          <span className="nowrap"> Leo's Repair Shop!</span>
        </h1>
      </header>

      <main className="public__main">
        <p>
          Located in Beautiful Seattle, WA, Leo's Repair Shop provides a trained
          staff ready to meet your device repair needs.
        </p>
        <address className="public__addr">
          Leo's Repair Shop
          <br />
          400 Broad St.
          <br />
          Seattle, WA 98109
          <br />
          <a href="tel: +12065552100">(206) 555-2100</a>
        </address>
        <br />
        <p>Owner: Leo Nidas</p>
      </main>

      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default PublicView;