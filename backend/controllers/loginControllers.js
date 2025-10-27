const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRepo = require("../repositories/authRepository");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { sendSuccess, sendError } = require("../middlewares/response");

// Controller: REGISTER user baru
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const user = await authRepo.findUserByEmail(email);

    if (user) {
      // Jika email sudah ada → kirim error 403
      return sendError(res, "Sorry Email Already Exist", 403);
    }

    // Simpan user baru ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepo.createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Kirim response sukses
    return sendSuccess(res, "User was successfully register", 201, newUser);
  } catch (err) {
    // Jika ada error saat create user
    return sendError(res, err.message, 400, err);
  }
};

// Controller: LOGIN user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Cari user berdasarkan email
    const user = await authRepo.findUserByEmail(email);

    // Validasi: user harus ada + password harus cocok
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError(res, "Username atau Password salah!", 401);
    }

    // jika cocok, buat token jwt
    const payload = { id: user.id, username: user.username, email: user.email };
    const token = jwt.sign(payload, SECRET_KEY);

    // kirim token ke cookie client
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res;
    return sendSuccess(res, "Berhasil Login", 200, {
      idUser: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error(error); // log error-nya
    return sendError(res, error.message, 500, error);
  }
};

module.exports = { register, login };
