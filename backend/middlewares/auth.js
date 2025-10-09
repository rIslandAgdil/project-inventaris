const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // mis. { id, username, email, role? }
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/Expired token" });
  }
};
