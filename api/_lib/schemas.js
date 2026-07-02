import { str, bool, date, int, oneOf } from "./validation.js";

/*
 * One config per content type: the table, default ordering, the public-visibility
 * column (if any), and a parse() that validates the request body into the exact
 * columns to write. Add a new module by adding an entry here + a DB table.
 */

export const news = {
  table: "news",
  order: "date desc, id desc",
  publicFilter: "published",
  parse: (b) => ({
    title: str(b, "title", { required: true, max: 300, label: "a title" }),
    category: str(b, "category", { max: 80 }),
    body: str(b, "body", { max: 20000 }),
    date: date(b, "date", { fallbackToday: true }),
    image_url: str(b, "image_url", { max: 1000 }),
    published: bool(b, "published"),
  }),
};

export const faculty = {
  table: "faculty",
  order: "sort_order asc, id asc",
  publicFilter: "active",
  parse: (b) => ({
    name: str(b, "name", { required: true, max: 160, label: "a name" }),
    subject: str(b, "subject", { max: 120 }),
    department: str(b, "department", { max: 120 }),
    photo_url: str(b, "photo_url", { max: 1000 }),
    designation: str(b, "designation", { max: 200 }),
    qualification: str(b, "qualification", { max: 2000 }),
    subjects: str(b, "subjects", { max: 2000 }),
    experience: str(b, "experience", { max: 200 }),
    bio: str(b, "bio", { max: 20000 }),
    expertise: str(b, "expertise", { max: 4000 }),
    achievements: str(b, "achievements", { max: 4000 }),
    certifications: str(b, "certifications", { max: 4000 }),
    languages: str(b, "languages", { max: 1000 }),
    email: str(b, "email", { max: 320 }),
    office_hours: str(b, "office_hours", { max: 500 }),
    sort_order: int(b, "sort_order", 0),
    active: bool(b, "active", true),
  }),
};

export const jobs = {
  table: "jobs",
  order: "created_at desc, id desc",
  publicFilter: "published",
  parse: (b) => ({
    role: str(b, "role", { required: true, max: 200, label: "a role" }),
    department: str(b, "department", { max: 120 }),
    type: str(b, "type", { max: 60 }),
    location: str(b, "location", { max: 160 }),
    closes_on: date(b, "closes_on"),
    description: str(b, "description", { max: 20000 }),
    og_image: str(b, "og_image", { max: 1000 }),
    published: bool(b, "published", true),
  }),
};

export const alumni = {
  table: "alumni",
  order: "sort_order asc, id asc",
  publicFilter: null,
  parse: (b) => ({
    name: str(b, "name", { required: true, max: 160, label: "a name" }),
    batch_year: str(b, "batch_year", { max: 20 }),
    role: str(b, "role", { max: 200 }),
    quote: str(b, "quote", { max: 2000 }),
    photo_url: str(b, "photo_url", { max: 1000 }),
    sort_order: int(b, "sort_order", 0),
  }),
};

export const gallery = {
  table: "gallery",
  order: "sort_order asc, id desc",
  publicFilter: null,
  parse: (b) => ({
    title: str(b, "title", { max: 200 }),
    category: str(b, "category", { max: 80 }),
    kind: oneOf(b, "kind", ["photo", "video"], "photo"),
    image_url: str(b, "image_url", { max: 1000 }),
    video_url: str(b, "video_url", { max: 1000 }),
    sort_order: int(b, "sort_order", 0),
  }),
};

export const management = {
  table: "management",
  order: "sort_order asc, id asc",
  publicFilter: "active",
  parse: (b) => ({
    name: str(b, "name", { required: true, max: 160, label: "a name" }),
    position: str(b, "position", { max: 200 }),
    photo_url: str(b, "photo_url", { max: 1000 }),
    bio: str(b, "bio", { max: 20000 }),
    message: str(b, "message", { max: 20000 }),
    years_of_service: str(b, "years_of_service", { max: 200 }),
    education: str(b, "education", { max: 4000 }),
    responsibilities: str(b, "responsibilities", { max: 4000 }),
    achievements: str(b, "achievements", { max: 4000 }),
    email: str(b, "email", { max: 320 }),
    sort_order: int(b, "sort_order", 0),
    active: bool(b, "active", true),
  }),
};
