import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, join } from "node:path";

/*
 * Dev-only plugin: serve the Vercel `api/` serverless functions during
 * `npm run dev`, so the admin panel and API work locally without the Vercel
 * CLI. In production, Vercel runs these same files natively.
 */
function devApi() {
  const apiDir = resolve(process.cwd(), "api");

  function matchHandler(urlPath) {
    const segs = urlPath.replace(/^\/api\//, "").replace(/\/+$/, "").split("/").filter(Boolean);
    if (!segs.length) return null;
    const direct = join(apiDir, ...segs) + ".js";
    if (existsSync(direct)) return { file: direct, params: {} };
    const index = join(apiDir, ...segs, "index.js");
    if (existsSync(index)) return { file: index, params: {} };
    if (segs.length >= 2) {
      const dynamic = join(apiDir, ...segs.slice(0, -1), "[id].js");
      if (existsSync(dynamic)) return { file: dynamic, params: { id: segs[segs.length - 1] } };
    }
    // `/resource/:id` → the resource's `index.js`, passing `id` as a query
    // param. Mirrors the vercel.json rewrite that does the same in production.
    if (segs.length >= 2) {
      const collapsed = join(apiDir, ...segs.slice(0, -1), "index.js");
      if (existsSync(collapsed)) return { file: collapsed, params: { id: segs[segs.length - 1] } };
    }
    return null;
  }

  return {
    name: "dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) return next();
        const [path, qs] = req.url.split("?");
        const match = matchHandler(path);
        if (!match) return next();

        req.query = { ...Object.fromEntries(new URLSearchParams(qs || "")), ...match.params };

        if (req.method !== "GET" && req.method !== "HEAD") {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          if (raw) { try { req.body = JSON.parse(raw); } catch { req.body = raw; } }
        }

        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (obj) => {
          if (!res.headersSent) res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
          return res;
        };

        try {
          const mod = await import(pathToFileURL(match.file).href + "?t=" + Date.now());
          await mod.default(req, res);
          if (!res.writableEnded) res.end();
        } catch (e) {
          console.error("[dev-api]", path, e);
          if (!res.headersSent) { res.statusCode = 500; res.setHeader("Content-Type", "application/json"); }
          if (!res.writableEnded) {
            res.end(JSON.stringify({ error: { message: "The local dev API hit an error.", code: "dev_api_error", detail: String(e?.message || e) } }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load every env var (not just VITE_*) so the api/ functions can read them.
  const env = loadEnv(mode, process.cwd(), "");
  for (const [k, v] of Object.entries(env)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }
  return { plugins: [react(), devApi()] };
});
