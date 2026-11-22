"use client";

import { useState } from "react";
import ContactText from "@/components/ui/ContactText";
import styles from "./campaign.module.css";

const QUESTIONS = [
  {
    question: "What recovery services are available at Zivel Coral Gables?",
    answer:
      "The studio offers options including cryotherapy, red light therapy, infrared sauna, compression therapy, float therapy, and more. A team member can help you choose based on your preferences and schedule.",
  },
  {
    question: "How often should I come in for recovery?",
    answer:
      "It depends on your schedule, preferences, and how you feel. The Coral Gables team can explain available services and help you consider what fits your routine. Recovery services do not replace rest, and individual experiences vary.",
  },
  {
    question: "Can I visit if I’m new to Muay Thai?",
    answer:
      "Beautiful Violence Muay Thai welcomes all experience levels, and Zivel can answer questions about its services for athletes at any stage of training. If you have an injury or persistent pain, seek advice from a qualified health professional.",
  },
  {
    question: "Can recovery services replace rest or medical care?",
    answer:
      "No. Recovery services are intended to complement sensible training, rest, and guidance from your qualified health professional. They are not medical treatment, and individual experiences vary.",
  },
  {
    question: "Do I need to know which service I want before visiting?",
    answer:
      "Not at all. Choose “I'm not sure yet” on the request form and the Coral Gables team can walk you through available options.",
  },
  {
    question: "Where can I find the gyms?",
    answer:
      "Zivel Coral Gables is at 348 Minorca Ave, Coral Gables, FL 33134. Beautiful Violence Muay Thai is at 4180 SW 74th Ct, Suite 209, Miami, FL. Call Zivel at (786) 527-0842 with questions.",
  },
];

export default function FighterRecoveryFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <div className={styles.wrap}>
        <div className={styles.faqIntro}>
          <div>
            <p className={styles.kicker}>Good questions, straight answers</p>
            <h2 id="faq-heading" className={styles.sectionTitle}>
              Recover with <span>clarity.</span>
            </h2>
          </div>
          <p className={styles.lede}>
            Practical details for athletes planning the work between training sessions.
          </p>
        </div>
        <div className={styles.faqList}>
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `beautiful-violence-faq-answer-${index}`;
            return (
              <article className={styles.faqItem} key={item.question}>
                <h3>
                  <button
                    className={styles.faqTrigger}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className={styles.faqPlus} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div className={styles.faqPanel} id={answerId} hidden={!isOpen}>
                  <p><ContactText>{item.answer}</ContactText></p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
