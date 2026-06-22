Collapsible panels that turn long text-heavy content (fees, affiliation, FAQs) into scannable rows.

```jsx
<Accordion defaultOpen={0} items={[
  { q: "What is the admission process?", a: "Submit an enquiry, attend an interaction…" },
  { q: "What are the fee structures?", a: "Fees vary by grade. Download the brochure…" },
]} />
```

Use `allowMultiple` to let several panels stay open. Item keys accept `q/a` or `title/content`.
