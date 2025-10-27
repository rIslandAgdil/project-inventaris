const jwt = require("jsonwebtoken");
const { sendError } = require("./response");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // Periksa token di cookies
    const cookieToken = req.cookies?.token;

    // Periksa token di header Authorization (jika disimpan di localStorage)
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // Gunakan token dari cookie atau bearer token
    const token = cookieToken || bearerToken;

    if (!token) {
      return sendError(res, "Akses ditolak. Token tidak ditemukan.", 401);
    }

    // Verifikasi token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Tambahkan informasi pengguna ke objek request
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendError(res, "Token sudah kadaluarsa.", 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return sendError(res, "Format token tidak valid.", 401);
    }
    return sendError(res, "Autentikasi gagal.", 401, error);
  }
};

module.exports = verifyToken;
