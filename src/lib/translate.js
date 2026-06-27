// Multi-language support via the Google Website Translator widget.
//
// We never show Google's stock UI (it's CSS-hidden). Instead the LanguageSwitcher
// drives translation through Google's `googtrans` cookie: setting it to "/en/<code>"
// and reloading makes the widget translate the freshly-rendered page on load, and
// the cookie keeps every subsequent page translated too. Picking English clears it.

// English is the original; the rest are offered in the switcher.
export const LANGS = [
  { code: "en", label: "English",   native: "English" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "gu", label: "Gujarati",  native: "ગુજરાતી" },
  { code: "hi", label: "Hindi",     native: "हिन्दी" },
  { code: "ta", label: "Tamil",     native: "தமிழ்" },
];

// Languages Google is allowed to translate into (everything except the source).
export const INCLUDED_LANGS = LANGS.filter((l) => l.code !== "en")
  .map((l) => l.code)
  .join(",");

const COOKIE = "googtrans";

function writeCookie(value, domain) {
  let str = `${COOKIE}=${value};path=/`;
  if (domain) str += `;domain=${domain}`;
  document.cookie = str;
}

function clearCookie(domain) {
  let str = `${COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  if (domain) str += `;domain=${domain}`;
  document.cookie = str;
}

// Current active language code, read back from the cookie ("/en/ml" -> "ml").
export function getCurrentLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!m) return "en";
  const parts = decodeURIComponent(m[1]).split("/");
  const code = parts[2] || "en";
  return LANGS.some((l) => l.code === code) ? code : "en";
}

// Switch language and reload so the widget re-applies on a clean render.
// The cookie is written on the bare host, the host, and the dot-domain so it
// sticks regardless of how the site is served (localhost, apex, or www).
export function setLang(code) {
  const host = window.location.hostname;
  const dotDomain = "." + host;

  if (code === "en") {
    clearCookie();
    clearCookie(host);
    clearCookie(dotDomain);
  } else {
    const value = "/en/" + code;
    writeCookie(value);
    writeCookie(value, host);
    writeCookie(value, dotDomain);
  }
  window.location.reload();
}

// Load Google's translate element once and mount it into a hidden host node.
// Safe to call repeatedly; subsequent calls are no-ops.
let booted = false;
export function bootGoogleTranslate() {
  if (booted || typeof window === "undefined") return;
  booted = true;

  if (!document.getElementById("google_translate_element")) {
    const host = document.createElement("div");
    host.id = "google_translate_element";
    document.body.appendChild(host);
  }

  window.googleTranslateElementInit = () => {
    /* global google */
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: INCLUDED_LANGS,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const s = document.createElement("script");
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}
