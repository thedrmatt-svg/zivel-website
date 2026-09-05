"use client";

import { useState } from "react";

const FAQS = [
  ["What is the best recovery after MMA or BJJ training?", "Start with the basics: fluids, food, sleep, and a sensible training plan. Zivel services can support that foundation. Depending on how you feel and what your coach recommends, compression, red light therapy, or cryotherapy may help you feel ready for the next session. They are additions to recovery—not replacements for rest or clinical care."],
  ["How soon after sparring can I use cryotherapy?", "Many athletes choose cryotherapy after a hard session or later the same day. There is no universal best timing; allow your body to settle, follow the studio team’s instructions, and avoid using it to mask pain and continue training. If you have a new injury, ask a qualified clinician first."],
  ["Is red light therapy useful for combat-sport muscle or soft-tissue recovery—and should I use it before or after training?", "Red light therapy may support normal recovery and comfort in muscles and soft tissue. Athletes often use it after training or on a separate recovery day. Some prefer it before training as part of a warm-up routine, but it should not replace a thorough warm-up or be expected to prevent injury."],
  ["Can infrared sauna help recovery after fight training?", "Infrared sauna may help you relax and can support a recovery routine. Hydrate before and after, replace electrolytes when appropriate, and leave if you feel dizzy, nauseated, or unwell. It is not a safe shortcut for making weight: never use sauna sessions for rapid dehydration or an unsafe weight cut."],
  ["Is compression therapy useful for my legs between sessions?", "Compression therapy can support circulation and may help legs feel less heavy between sessions, especially after roadwork, wrestling, or a long day on your feet. Keep the pressure comfortable and tell the team about relevant medical conditions before a session."],
  ["Can I stack cryotherapy, red light therapy, and compression in one visit?", "A combination may fit some athletes’ routines, but more is not always better. The studio team can help you choose an order and duration based on your training load and how you feel. Do not stack services to push through pain, illness, or dehydration."],
  ["How often should fighters use recovery services?", "Training load matters more than a fixed number. A recreational athlete may visit around harder sessions, while a high-volume camp may use a consistent plan with coach and clinician input. Start conservatively, notice how you respond, and prioritize sleep, nutrition, hydration, and rest days."],
  ["How does recovery differ for grapplers versus strikers?", "Grapplers may notice more whole-body fatigue, grip and neck demand, and leg heaviness from repeated scrambles. Strikers may focus on footwork, hips, shoulders, and impact load. The right service depends on your session and symptoms—not your label—and a coach or qualified clinician can help shape the plan."],
  ["Do these services treat injuries?", "No. Zivel recovery services are not a diagnosis or treatment for an injury. For significant pain, swelling, numbness, concussion symptoms, a suspected fracture, or symptoms that persist, stop training and seek a qualified medical professional. Get clearance before returning to hard work."],
  ["Where can ATT Sandy Springs members find recovery nearby?", "Zivel Buckhead is the nearby recovery partner for American Top Team Sandy Springs members. The studio is at 2221 Peachtree Rd NE Suite F, Atlanta, GA 30309. Call (404) 309-5954 for current availability and partnership information."],
];

export default function FighterRecoveryFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="att-faq" aria-labelledby="faq-heading">
      <div className="att-wrap">
        <div className="att-faq-intro">
          <p className="att-kicker">The fighter’s field guide</p>
          <h2 id="faq-heading" className="att-h2 att-display">Recovery questions<br /><span>answered straight.</span></h2>
          <p className="att-lede">Practical context for MMA fighters, BJJ athletes, boxers, wrestlers, and Muay Thai athletes. When in doubt, ask your coach or a qualified clinician.</p>
        </div>
        <div className="att-faq-list">
          {FAQS.map(([question, answer], index) => {
            const isOpen = open === index;
            const panelId = `fighter-faq-answer-${index}`;
            return (
              <div className={`att-faq-item ${isOpen ? "is-open" : ""}`} key={question}>
                <button id={panelId + "-button"} className="att-faq-trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : index)}>
                  <span>{question}</span><span className="att-faq-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div id={panelId} role="region" aria-labelledby={panelId + "-button"} className="att-faq-panel">
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}