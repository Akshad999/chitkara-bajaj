export function errorHandler(err, req, res, next) {
  console.error("Unhandled:", err);
  return res.status(500).json({ is_success: false, error: "Internal server error" });
}
