import { SignJWT, jwtVerify } from "jose";
import { parse, serialize } from "cookie";
import { Err } from "./response.js";

/*
 * Single-admin auth. A JWT is stored in an httpOnly cookie so it can't be read
 * by client JavaScript. The signing secret comes from JWT_SECRET.
 */
export const COOKIE = "sgv_admin";
const ONE_WEEK = 60 * 60 * 24 * 7;

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw Err.notConfigured("The admin login");
  return new TextEncoder().encode(s);
}

export async function signSession(username) {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function getSession(req) {
  const token = parse(req.headers.cookie || "")[COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

// Throws a friendly 401 if the request isn't an authenticated admin.
export async function requireAdmin(req) {
  const session = await getSession(req);
  if (!session || session.role !== "admin") throw Err.unauthorized();
  return session;
}

export function sessionCookie(token) {
  return serialize(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
  });
}

export function clearCookie() {
  return serialize(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
