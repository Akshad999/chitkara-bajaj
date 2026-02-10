
import { validateBfhlBody, extractSingleKey } from "../utils/validator.util.js";
import { fibonacciSeries, lcmOfArray, hcfOfArray } from "../utils/math.util.js";
import { filterPrimes } from "../utils/prime.util.js";
import { askGeminiSingleWord } from "../services/gemini.service.js";

export async function postBfhl(req, res) {
  const email = process.env.OFFICIAL_EMAIL || "YOUR CHITKARA EMAIL";

  try {
    // 1) Validate request body (must contain exactly one key)
    const v = validateBfhlBody(req.body);
    if (!v.ok) {
      const status = v.code === "TYPE_ERROR" ? 422 : 400;
      return res.status(status).json({
        is_success: false,
        official_email: email,
        error: v.message
      });
    }

    // 2) Extract key/value
    const { key, value } = extractSingleKey(req.body);

    // 3) Compute result
    let data;

    if (key === "fibonacci") {
      data = fibonacciSeries(value);
    } else if (key === "prime") {
      data = filterPrimes(value);
    } else if (key === "lcm") {
      data = lcmOfArray(value);
    } else if (key === "hcf") {
      data = hcfOfArray(value);
    } else if (key === "AI") {
      data = await askGeminiSingleWord(value);
    } else {
      return res.status(400).json({
        is_success: false,
        official_email: email,
        error: "Invalid key. Allowed: fibonacci, prime, lcm, hcf, AI"
      });
    }
    return res.status(200).json({
      is_success: true,
      official_email: email,
      data
    });
  } catch (err) {
    console.error("BFHL error:", err);
    const status = err?.status || err?.response?.status;

    if (status === 429) {
      return res.status(429).json({
        is_success: false,
        official_email: email,
        error: "AI rate limit reached. Please try again later."
      });
    }
    return res.status(500).json({
      is_success: false,
      official_email: email,
      error: "Internal server error"
    });
  }
}
