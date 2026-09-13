import { useState } from "react";
import Tabs from "../components/Tabs";
import FaqAccordion from "../components/FaqAccordion";
import { FAQ_CATEGORIES, FAQS } from "../data/faqs";
import "./FAQs.css";

export default function FAQsPage() {
  const [category, setCategory] = useState("General");

  return (
    <section className="faqs-page">
      <div className="wrap faqs-hero">
        <span className="kicker">Education Center</span>
        <h1>Frequently Asked Questions</h1>
        <p className="faqs-sub">Answers for everyone on the platform, split by who you are.</p>
      </div>

      <div className="wrap">
        <Tabs tabs={FAQ_CATEGORIES} active={category} onChange={setCategory} idBase="faq-cat" />
        <div
          role="tabpanel"
          id={`faq-cat-panel-${category}`}
          aria-labelledby={`faq-cat-tab-${category}`}
          className="faqs-panel"
        >
          <FaqAccordion items={FAQS[category]} />
        </div>
      </div>
    </section>
  );
}
