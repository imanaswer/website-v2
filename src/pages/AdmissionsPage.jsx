import { useState } from "react";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Checkbox } from "../components/Checkbox";
import { Accordion } from "../components/Accordion";
import { PageHero } from "../components/PageHero";
import { Label } from "../components/Ed";

const IMG = {
  a2: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
};

function Journey() {
  const steps = [
    { n: "01", t: "Submit an enquiry",    d: "Tell us a little about your child using the short form below." },
    { n: "02", t: "A personal conversation", d: "A warm conversation with our admissions team, and a friendly interaction with your child." },
    { n: "03", t: "Registration",         d: "Complete the registration with the required documents." },
    { n: "04", t: "Welcome to the family", d: "Receive your offer and join the school — orientation follows." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal style={{ marginBottom: "var(--space-12)" }}>
          <Label>The Admissions Journey</Label>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem", maxWidth: "18ch" }}>
            Four simple, guided steps
          </h2>
        </Reveal>
        <div className="index-list">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "auto 4fr 6fr", alignItems: "baseline", gap: "1.5rem", padding: "clamp(1.6rem,2.8vw,2.4rem) 0" }}>
                <span className="numeral" style={{ fontSize: "1.7rem", color: "var(--sand-400)", minWidth: "2.2ch" }}>{s.n}</span>
                <h3 style={{ fontSize: "clamp(1.4rem,1.1rem + 1vw,2rem)", fontWeight: 400 }}>{s.t}</h3>
                <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "42ch" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const contacts = [
    { k: "Call",  v: "0495 236 5215" },
    { k: "Email", v: "admissions@srigujaratividyalaya.com" },
    { k: "Visit", v: "Beach Road, Mananchira, Kozhikode" },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide enq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "var(--space-16)", alignItems: "start" }}>
        <Reveal>
          <Label>Admission Enquiry</Label>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, margin: "1rem 0 1.4rem", maxWidth: "16ch" }}>
            Let's start the conversation
          </h2>
          <p className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "2.4rem" }}>
            Share a few details and our admissions team will reach out within one working day with
            the next steps and a prospectus.
          </p>
          <dl className="index-list" style={{ margin: 0 }}>
            {contacts.map((c) => (
              <div key={c.k} className="index-row" style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "1.5rem", padding: "1.1rem 0", alignItems: "baseline" }}>
                <dt className="label">{c.k}</dt>
                <dd style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)" }}>{c.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ background: "var(--surface-card)", borderRadius: "4px", padding: "clamp(1.6rem,3vw,2.6rem)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-sm)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <Icon name="check-circle" weight="fill" size={48} style={{ color: "var(--green-600)", marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: "0.5rem" }}>Thank you</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--text-secondary)" }}>Your enquiry is in. We'll be in touch within one working day.</p>
                <Button variant="secondary" style={{ marginTop: "1.6rem" }} onClick={() => setSent(false)}>Submit another</Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <Input label="Parent / Guardian name" required placeholder="Full name" />
                  <Input label="Student name" required placeholder="Child's name" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <Input label="Mobile" type="tel" required placeholder="10-digit number" icon={<Icon name="phone" size={16} />} />
                  <Input label="Email" type="email" placeholder="you@email.com" icon={<Icon name="envelope-simple" size={16} />} />
                </div>
                <Select label="Applying for" required placeholder="Select a grade"
                  options={["Pre-KG", "LKG", "UKG", "Class I", "Class V", "Class IX", "Class XI — Science", "Class XI — Commerce"]} />
                <Checkbox label="I agree to be contacted about admissions" description="We'll only use your details to respond to this enquiry." defaultChecked />
                <Button type="submit" size="lg" fullWidth iconRight={<Icon name="arrow-right" size={18} />}>Submit enquiry</Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Fees() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal style={{ marginBottom: "var(--space-10)" }}>
          <Label>Good to Know</Label>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem" }}>Fees &amp; frequently asked</h2>
        </Reveal>
        <Reveal>
          <Accordion defaultOpen={0} items={[
            { q: "What is the fee structure?",                  a: "Fees vary by grade and are kept deliberately accessible as a community institution. Speak to our office for the current year's structure and payment schedule." },
            { q: "Are there sibling or community concessions?", a: "Yes. As a charitable society managed by the linguistic minority, the school offers considerations for siblings and community members. Please enquire with the admissions office." },
            { q: "What documents are required for admission?",  a: "Birth certificate, transfer certificate (for transfers), recent photographs, and previous report cards where applicable." },
            { q: "Is transport available?",                     a: "Transport is optional and charged separately, with routes covering Kozhikode and nearby areas." },
          ]} />
        </Reveal>
      </div>
    </section>
  );
}

export function AdmissionsPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Admissions" eyebrow="Admissions 2026–27"
        title="A warm welcome begins here"
        lead="A guided, parent-friendly admissions experience — from your first enquiry to your child's first day."
        image={IMG.a2} />
      <Journey />
      <EnquiryForm />
      <Fees />
    </div>
  );
}
