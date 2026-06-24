/*
 * Seed the database with the school's current real content so the site isn't
 * empty on first run. Reads DATABASE_URL from the environment.
 * Usage:  DATABASE_URL='postgres://...' node scripts/seed.mjs
 *
 * This REPLACES existing rows in each table. Run it once after schema.sql.
 */
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Example:\n  DATABASE_URL='postgres://...' node scripts/seed.mjs");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);

const F = "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/";
const T = "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/";
const U = "https://www.srigujaratividhyalaya.com/wp-content/uploads/";

const faculty = [
  ["Poonam S Desai", "English", "Languages", F + "POONAM-S-DESAI.jpg"],
  ["Gayathri K S", "English", "Languages", F + "GAYATHRI-K-S.jpg"],
  ["Prizy George", "Malayalam", "Languages", F + "PRIZY-GEORGE-1.jpg"],
  ["Bijina I K", "Hindi", "Languages", F + "BIJINA-I-K.jpg"],
  ["Adita D Shah", "Gujarathi", "Languages", F + "ADITA-D-SHAH.jpg"],
  ["Jasna P", "Mathematics", "Mathematics & Sciences", F + "JASNA-P.jpg"],
  ["Jissy Joseph", "Physics", "Mathematics & Sciences", F + "JISSY-JOSEPH.jpg"],
  ["Shimna K", "Biology", "Mathematics & Sciences", F + "SHIMNA-K.jpg"],
  ["Nisha C", "Social Science", "Mathematics & Sciences", F + "NISHA-C.jpg"],
  ["Roshni Shalet D Mello", "Economics", "Commerce", F + "ROSHNI-SHALET-D.jpg"],
  ["Namitha A K", "Accountancy", "Commerce", F + "NAMITHA-A-K.jpg"],
  ["P V Neethu", "Business Studies", "Commerce", F + "P-V-NEETHU.jpg"],
  ["Sunitha Kumari TK", "Computer", "Computer Science", F + "SUNITHA-KUMARI-T.jpg"],
  ["Supriya M", "Computer", "Computer Science", F + "SUPRIYA-M.jpg"],
  ["Megha K", "Computer", "Computer Science", F + "MEGHA-K.jpg"],
  ["Vishnupriya K", "Montessori", "Early Years & Arts", F + "VISHNUPRIYA-K.jpg"],
  ["Mary Tom", "Montessori", "Early Years & Arts", F + "MARY-TOM.jpg"],
  ["Dhanya C", "Drawing", "Early Years & Arts", F + "DHANYA-C.jpg"],
];

const news = [
  ["Plus One admissions open for 2024–25", "Admissions", "Applications for the Plus One academic year are now open.", "2024-06-27", U + "2024/06/plusone-555x555.jpeg", true],
  ["School honoured with the MLA's Excellence Award", "Achievement", "The school was recognised with the MLA's Excellence Award.", "2023-07-03", U + "2023/07/1-31-555x472.jpg", true],
  ["International Yoga Day observed on campus", "Campus", "Students and staff marked International Yoga Day together.", "2023-06-21", U + "2023/07/4-13-555x472.jpg", true],
  ["World Ocean Day — a lesson beyond the classroom", "Campus", "A day of learning about our oceans and the environment.", "2023-06-08", U + "2023/07/3-18-555x472.jpg", true],
];

const gallery = [
  ["The main campus", "Campus", "photo", T + "gujarati-school.jpg", null],
  ["Our teachers", "Campus", "photo", T + "Faculty_.jpg", null],
  ["In the classroom", "Academics", "photo", T + "progrm.jpg", null],
  ["International Yoga Day", "Celebrations", "photo", U + "2023/07/4-13-555x472.jpg", null],
];

async function run() {
  console.log("Seeding faculty…");
  await sql`delete from faculty`;
  let i = 0;
  for (const [name, subject, dept, photo] of faculty) {
    await sql`insert into faculty (name, subject, department, photo_url, sort_order)
              values (${name}, ${subject}, ${dept}, ${photo}, ${i++})`;
  }

  console.log("Seeding news…");
  await sql`delete from news`;
  for (const [title, category, body, date, image, published] of news) {
    await sql`insert into news (title, category, body, date, image_url, published)
              values (${title}, ${category}, ${body}, ${date}, ${image}, ${published})`;
  }

  console.log("Seeding gallery…");
  await sql`delete from gallery`;
  i = 0;
  for (const [title, category, kind, image, video] of gallery) {
    await sql`insert into gallery (title, category, kind, image_url, video_url, sort_order)
              values (${title}, ${category}, ${kind}, ${image}, ${video}, ${i++})`;
  }

  console.log("Done. Faculty, news and gallery seeded. (jobs and alumni start empty.)");
}

run().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
