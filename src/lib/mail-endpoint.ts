export function mailEndpoint(path: "/api/upit" | "/api/upitnik") {
  const base = process.env.NEXT_PUBLIC_MAIL_ENDPOINT?.replace(/\/$/, "");
  return base ? `${base}${path}` : path;
}
