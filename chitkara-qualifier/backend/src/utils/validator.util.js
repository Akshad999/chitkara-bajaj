const ALLOWED_KEYS = ["fibonacci", "prime", "lcm", "hcf", "AI"];

export function extractSingleKey(body) {
  const key = Object.keys(body)[0];
  return { key, value: body[key] };
}

export function validateBfhlBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, code: "BAD_REQUEST", message: "Body must be a JSON object" };
  }

  const keys = Object.keys(body);
  if (keys.length !== 1) {
    return {
      ok: false,
      code: "BAD_REQUEST",
      message: "Request must contain exactly ONE key: fibonacci, prime, lcm, hcf, or AI"
    };
  }

  const key = keys[0];
  if (!ALLOWED_KEYS.includes(key)) {
    return { ok: false, code: "BAD_REQUEST", message: "Invalid key" };
  }

  const value = body[key];

  if (key === "fibonacci") {
    if (!Number.isInteger(value)) return { ok: false, code: "TYPE_ERROR", message: "fibonacci must be an integer" };
    if (value < 0) return { ok: false, code: "TYPE_ERROR", message: "fibonacci must be >= 0" };
    return { ok: true };
  }

  if (key === "AI") {
    if (typeof value !== "string" || !value.trim()) {
      return { ok: false, code: "TYPE_ERROR", message: "AI must be a non-empty string" };
    }
    return { ok: true };
  }

  if (!Array.isArray(value) || value.length === 0) {
    return { ok: false, code: "TYPE_ERROR", message: `${key} must be a non-empty array of integers` };
  }

  for (const n of value) {
    if (!Number.isInteger(n)) return { ok: false, code: "TYPE_ERROR", message: `${key} array must contain integers` };
    if (n <= 0) return { ok: false, code: "TYPE_ERROR", message: `${key} values must be > 0` };
  }

  return { ok: true };
}
