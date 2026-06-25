import { test } from "node:test";
import assert from "node:assert/strict";
import { tagsFromMeta } from "./tags.js";

test("emits og + twitter + canonical + robots", () => {
  const tags = tagsFromMeta({
    title: "Physics Teacher — SGV",
    description: "Teach physics",
    url: "https://x.com/careers/physics-1",
    canonical: "https://x.com/careers/physics-1",
    image: "https://x.com/assets/og.jpg",
    imageWidth: 1200,
    imageHeight: 627,
    robots: "index,follow",
    type: "website",
  }).join("\n");
  assert.match(tags, /<meta property="og:title" content="Physics Teacher — SGV" \/>/);
  assert.match(tags, /<meta property="og:image:width" content="1200" \/>/);
  assert.match(tags, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(tags, /<link rel="canonical" href="https:\/\/x.com\/careers\/physics-1" \/>/);
  assert.match(tags, /<meta name="robots" content="index,follow" \/>/);
});

test("escapes attribute values", () => {
  const tags = tagsFromMeta({ title: `A "quoted" & <tag>` }).join("\n");
  assert.match(tags, /content="A &quot;quoted&quot; &amp; &lt;tag&gt;"/);
});

test("serializes JSON-LD into a script tag and neutralizes </script>", () => {
  const tags = tagsFromMeta({ jsonLd: { "@type": "JobPosting", description: "ends </script> here" } }).join("\n");
  assert.match(tags, /<script type="application\/ld\+json">/);
  assert.ok(!tags.includes("</script> here"), "raw </script> must be escaped");
});

test("omits image width/height when no image", () => {
  const tags = tagsFromMeta({ title: "x", imageWidth: 1200 }).join("\n");
  assert.ok(!tags.includes("og:image:width"));
});
