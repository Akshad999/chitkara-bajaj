export function notFoundHandler(req, res) {
  return res.status(404).json({ is_success: false, error: "Route not found" });
}
