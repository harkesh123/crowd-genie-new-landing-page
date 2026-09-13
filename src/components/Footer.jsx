import { Link } from "react-router-dom";
import LampMark from "./LampMark";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <LampMark />
            <span>crowd-genie.com</span>
          </div>
          <p>Making SME borrowing faster, cheaper and simpler than traditional financial institutions.</p>
        </div>

        <nav aria-label="Menu">
          <h2>Menu</h2>
          <Link to="/faqs">Education Center</Link>
          <Link to="/the-team">The Team</Link>
          <Link to="/contact-us">Contact Us</Link>
        </nav>

        <nav aria-label="Legal and support">
          <h2>Legal &amp; Support</h2>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/crowdgenie-dev.appspot.com/o/team%2FTERMS%20AND%20CONDITIONS%20FOR%20THE%20CROWD%20GENIE%20PLATFORM.pdf?alt=media&token=5ae005b9-d98b-40f6-897b-de2f5858ab01"
            target="_blank"
            rel="noreferrer"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/crowdgenie-dev.appspot.com/o/team%2Fcrowdgenie_privacy.pdf?alt=media&token=4a5421e9-6b5f-4573-b299-deda520f749d"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
        </nav>

        <div>
          <h2>Get in Touch</h2>
          <a href="mailto:help@crowd-genie.com">help@crowd-genie.com</a>
          <a href="tel:+6596732614">+65&nbsp;9673&nbsp;2614</a>
          <p>
            Crowd Genie Financial Services Pte. Ltd.
            <br />
            46 Kim Yam Rd, #01-06, Singapore&nbsp;239351
          </p>
        </div>
      </div>

      <div className="wrap footer-legal">
        <p className="footer-legal-title">Important Legal Notice and Disclosure</p>
        <p>
          Crowd Genie Financial Services Pte. Ltd. (&ldquo;CG&rdquo;), registered in Singapore (UEN&nbsp;201600134C), provides
          services that involve maintaining a list of Issuers which are looking to raise funds by the issuance of Notes,
          allowing potential Investors to subscribe for Notes issued by the Issuers and such other services as CG may
          introduce from time to time. The content and material on this website is for information only and should not be
          regarded as an offer, solicitation, invitation, advice or recommendation to buy, sell, subscribe or dispose of
          any investments, securities, or other financial services, instruments or banking products.
        </p>
        <p>
          This website is intended for Accredited Investors only as defined in section&nbsp;4A(1)(a) of the Securities and
          Futures Act (&ldquo;SFA&rdquo;), Chapter&nbsp;289.
        </p>
        <p className="footer-copyright">Copyright © {new Date().getFullYear()} Crowd Genie Financial Services Pte. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
