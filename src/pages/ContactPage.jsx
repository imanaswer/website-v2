import { useState } from "react";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { PageHero } from "../components/PageHero";
import { Label } from "../components/Ed";

const IMG = {
  campus: "/assets/photos/campus-entrance.jpg",
};

function Details() {
  const rows = [
    { k: "Address", v: ["Beach Road, Mananchira", "Kozhikode, Kerala 673032"] },
    { k: "Phone",   v: ["0495 236 5215"] },
    { k: "Hours",   v: ["Monday – Saturday", "9:00 am – 4:00 pm"] },
    { k: "Email",   v: ["info@srigujaratividyalaya.com", "admissions@srigujaratividyalaya.com"] },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 9fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>Find Us</Label>
              <div className="rule--gold" style={{ margin: "1.1rem 0" }} />
            </Reveal>
          </aside>
          <div className="index-list">
            {rows.map((r, i) => (
              <Reveal key={r.k} delay={i * 60}>
                <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "var(--space-10)", padding: "clamp(1.3rem,2.2vw,1.9rem) 0", alignItems: "baseline" }}>
                  <dt className="label">{r.k}</dt>
                  <dd style={{ margin: 0 }}>
                    {r.v.map((line) => (
                      <div key={line} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem,1.05rem + 0.6vw,1.6rem)", color: "var(--text-primary)", lineHeight: 1.4 }}>{line}</div>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitAndMap() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section" style={{ background: "var(--surface-raised)", paddingTop: 0 }}>
      <div className="container container--wide" style={{ paddingTop: "var(--section-y)" }}>
        <div className="contact-grid">
          <Reveal>
            <div>
              <Label>Book a Visit</Label>
              <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, margin: "1rem 0 1.8rem", maxWidth: "16ch" }}>
                Come and see our campus
              </h2>
              {sent ? (
                <div style={{ padding: "1.5rem 0" }}>
                  <Icon name="check-circle" weight="fill" size={44} style={{ color: "var(--green-600)", marginBottom: "0.8rem" }} />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 400 }}>Visit requested</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>We'll confirm your slot by phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", maxWidth: 460 }}>
                  <Input label="Your name" required placeholder="Full name" />
                  <div className="form-grid">
                    <Input label="Mobile" type="tel" required placeholder="10-digit number" icon={<Icon name="phone" size={16} />} />
                    <Input label="Preferred date" type="date" />
                  </div>
                  <Select label="Reason for visit" placeholder="Select" options={["Admission enquiry", "Campus tour", "Meet the principal", "Careers / other"]} />
                  <Button type="submit" size="lg" iconRight={<Icon name="arrow-right" size={18} />} style={{ alignSelf: "flex-start" }}>Request a visit</Button>
                </form>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="photo-frame" style={{ overflow: "hidden", height: "100%", minHeight: 380, position: "relative", background: "var(--surface-sunken)" }}>
              <iframe
                title="Map to Sri Gujarati Vidyalaya, Mananchira, Kozhikode"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.77%2C11.24%2C75.80%2C11.27&layer=mapnik&marker=11.2588%2C75.7804"
                style={{ width: "100%", height: "100%", border: 0, filter: "saturate(0.8) sepia(0.06)" }}
              />
              <div style={{ position: "absolute", left: 16, bottom: 16, background: "var(--surface-card)", padding: "0.85rem 1.1rem", boxShadow: "var(--shadow-md)", display: "flex", gap: "0.7rem", alignItems: "center", border: "1px solid var(--border-subtle)" }}>
                <Icon name="map-pin" weight="fill" size={20} style={{ color: "var(--maroon-700)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600 }}>Mananchira, Kozhikode</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "var(--space-12)", alignItems: "center", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "clamp(2.2rem,4vw,3.5rem) 0" }}>
            <div>
              <Label>Stay in Touch</Label>
              <h2 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,2.8rem)", fontWeight: 400, margin: "1rem 0 0.8rem", maxWidth: "16ch" }}>The school newsletter</h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.6, maxWidth: "40ch" }}>Events, results and stories from campus — a few times a term, never spam.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
              {done ? (
                <div style={{ fontFamily: "var(--font-sans)", color: "var(--green-600)", fontWeight: 600, fontSize: "1.1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <Icon name="check-circle" weight="fill" size={22} /> You're subscribed — thank you.
                </div>
              ) : (
                <>
                  <Input containerStyle={{ flex: 1 }} type="email" required placeholder="Your email address" icon={<Icon name="envelope-simple" size={16} />} />
                  <Button type="submit" size="md">Subscribe</Button>
                </>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Contact" eyebrow="Get in Touch"
        title="Visit us at Mananchira"
        lead="Questions about admissions, a campus visit, or careers at Sri Gujarati Vidyalaya — reach out, and we'll respond promptly."
        image={IMG.campus} />
      <Details />
      <VisitAndMap />
      <Newsletter />
    </div>
  );
}
