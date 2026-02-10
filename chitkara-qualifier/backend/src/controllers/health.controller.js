export function getHealth(req, res) {
  const email = process.env.OFFICIAL_EMAIL || "YOUR CHITKARA EMAIL";
  return res.status(200).json({
    is_success: true,
    official_email: email
  });
}
