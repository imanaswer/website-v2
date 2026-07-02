/*
 * The CMS is config-driven: each content type is one entry here. Adding a new
 * managed module = add a config object + a DB table + a /api/<path> endpoint.
 * The generic ResourceList and ResourceForm render everything from this.
 *
 * Field types: text · textarea · date · number · checkbox · select · image · url
 * Optional per field: required, placeholder, help, half (half-width), options
 * (for select), folder (for image uploads), showIf(form) (conditional display).
 */
const today = () => new Date().toISOString().slice(0, 10);

export const RESOURCES = [
  {
    key: "news", path: "news", label: "News & Events", icon: "newspaper",
    publishable: true,
    primary: "title",
    subtitle: (r) => [r.category, r.date].filter(Boolean).join(" · "),
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "e.g. Plus One admissions open" },
      { name: "category", label: "Category", type: "text", half: true, placeholder: "e.g. Admissions" },
      { name: "date", label: "Date", type: "date", half: true },
      { name: "body", label: "Body", type: "textarea", placeholder: "Write the announcement…" },
      { name: "image_url", label: "Photo", type: "image", folder: "news" },
      { name: "published", label: "Published", type: "checkbox", help: "When on, this appears on the public website." },
    ],
    defaults: () => ({ title: "", category: "", date: today(), body: "", image_url: "", published: false }),
  },
  {
    key: "faculty", path: "faculty", label: "Faculty", icon: "chalkboard-teacher",
    primary: "name",
    subtitle: (r) => [r.subject, r.department].filter(Boolean).join(" · "),
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", half: true, placeholder: "e.g. Senior Mathematics Teacher" },
      { name: "subject", label: "Primary subject", type: "text", half: true, placeholder: "e.g. Physics" },
      { name: "department", label: "Department", type: "text", half: true, placeholder: "e.g. Mathematics & Sciences" },
      { name: "experience", label: "Experience", type: "text", half: true, placeholder: "e.g. 18 Years" },
      { name: "photo_url", label: "Photo", type: "image", folder: "faculty" },
      { name: "bio", label: "Biography", type: "textarea", placeholder: "About this teacher…" },
      { name: "qualification", label: "Qualifications", type: "textarea", help: "One per line — e.g. M.Sc / B.Ed / M.Ed" },
      { name: "subjects", label: "Subjects handled", type: "textarea", help: "One per line. Leave blank to use the primary subject." },
      { name: "expertise", label: "Areas of expertise", type: "textarea", help: "One per line." },
      { name: "achievements", label: "Awards & achievements", type: "textarea", help: "One per line." },
      { name: "certifications", label: "Certifications", type: "textarea", help: "One per line." },
      { name: "languages", label: "Languages known", type: "textarea", help: "One per line. Optional." },
      { name: "email", label: "Contact email", type: "text", half: true, placeholder: "name@example.com" },
      { name: "office_hours", label: "Office hours", type: "text", half: true, placeholder: "e.g. Mon–Fri, 10–11am" },
      { name: "sort_order", label: "Sort order", type: "number", half: true, help: "Lower numbers show first." },
      { name: "active", label: "Active", type: "checkbox", help: "When off, this profile is hidden from the site." },
    ],
    defaults: () => ({ name: "", designation: "", subject: "", department: "", experience: "", photo_url: "", bio: "", qualification: "", subjects: "", expertise: "", achievements: "", certifications: "", languages: "", email: "", office_hours: "", sort_order: 0, active: true }),
  },
  {
    key: "jobs", path: "jobs", label: "Hiring / Jobs", icon: "briefcase",
    publishable: true,
    primary: "role",
    subtitle: (r) => [r.department, r.type, r.location].filter(Boolean).join(" · "),
    fields: [
      { name: "role", label: "Role", type: "text", required: true, placeholder: "e.g. Physics Teacher" },
      { name: "department", label: "Department", type: "text", half: true },
      { name: "type", label: "Type", type: "select", half: true, options: ["Full-time", "Part-time", "Contract", "Temporary"] },
      { name: "location", label: "Location", type: "text", half: true, placeholder: "Mananchira, Kozhikode" },
      { name: "closes_on", label: "Closing date", type: "date", half: true },
      { name: "description", label: "Description", type: "textarea", placeholder: "Role details, qualifications, how to apply…" },
      { name: "og_image", label: "Share image", type: "image", folder: "jobs", help: "Optional. Shown when this job is shared on LinkedIn/Google. Falls back to the default careers image." },
      { name: "published", label: "Published", type: "checkbox", help: "When on, this appears on the Careers page." },
    ],
    defaults: () => ({ role: "", department: "", type: "Full-time", location: "Mananchira, Kozhikode", closes_on: "", description: "", og_image: "", published: true }),
  },
  {
    key: "alumni", path: "alumni", label: "Alumni", icon: "users-three",
    primary: "name",
    subtitle: (r) => [r.role, r.batch_year && `Batch ${r.batch_year}`].filter(Boolean).join(" · "),
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "batch_year", label: "Batch year", type: "text", half: true, placeholder: "e.g. 2016" },
      { name: "role", label: "Current role", type: "text", half: true, placeholder: "e.g. Doctor" },
      { name: "quote", label: "Quote", type: "textarea", placeholder: "A line in their words…" },
      { name: "photo_url", label: "Photo", type: "image", folder: "alumni" },
      { name: "sort_order", label: "Sort order", type: "number", half: true },
    ],
    defaults: () => ({ name: "", batch_year: "", role: "", quote: "", photo_url: "", sort_order: 0 }),
  },
  {
    key: "gallery", path: "gallery", label: "Gallery", icon: "images",
    primary: "title",
    subtitle: (r) => [r.kind === "video" ? "Video" : "Photo", r.category].filter(Boolean).join(" · "),
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "e.g. Annual Day 2025" },
      { name: "category", label: "Category", type: "text", half: true, placeholder: "e.g. Celebrations" },
      { name: "kind", label: "Type", type: "select", half: true, options: [{ value: "photo", label: "Photo" }, { value: "video", label: "Video" }] },
      { name: "image_url", label: "Photo", type: "image", folder: "gallery", showIf: (f) => f.kind !== "video" },
      { name: "video_url", label: "Video link (YouTube / Vimeo)", type: "url", placeholder: "https://youtube.com/watch?v=…", help: "Paste a YouTube or Vimeo link.", showIf: (f) => f.kind === "video" },
      { name: "sort_order", label: "Sort order", type: "number", half: true },
    ],
    defaults: () => ({ title: "", category: "", kind: "photo", image_url: "", video_url: "", sort_order: 0 }),
  },
  {
    key: "management", path: "management", label: "School Management", icon: "users-three",
    primary: "name",
    subtitle: (r) => [r.position].filter(Boolean).join(" · "),
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "position", label: "Position", type: "text", half: true, placeholder: "e.g. President" },
      { name: "years_of_service", label: "Years of service", type: "text", half: true, placeholder: "e.g. 12 Years" },
      { name: "photo_url", label: "Photo", type: "image", folder: "management" },
      { name: "bio", label: "Biography", type: "textarea", placeholder: "About this member…" },
      { name: "message", label: "Message from the member", type: "textarea", help: "Optional." },
      { name: "education", label: "Education", type: "textarea", help: "One per line. Optional." },
      { name: "responsibilities", label: "Responsibilities", type: "textarea", help: "One per line." },
      { name: "achievements", label: "Achievements", type: "textarea", help: "One per line." },
      { name: "email", label: "Contact email", type: "text", half: true, placeholder: "name@example.com" },
      { name: "sort_order", label: "Sort order", type: "number", half: true, help: "Lower numbers show first." },
      { name: "active", label: "Active", type: "checkbox", help: "When off, this profile is hidden from the site." },
    ],
    defaults: () => ({ name: "", position: "", years_of_service: "", photo_url: "", bio: "", message: "", education: "", responsibilities: "", achievements: "", email: "", sort_order: 0, active: true }),
  },
];

export const byPath = (path) => RESOURCES.find((r) => r.path === path);
