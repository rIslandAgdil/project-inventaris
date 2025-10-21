// Import PrismaClient dari package @prisma/client
const { PrismaClient } = require("@prisma/client");
// Membuat instance PrismaClient
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Controller: REGISTER user baru
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Cek apakah email sudah terdaftar
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    // Jika email sudah ada → kirim error 403
    res.status(403).json({
      data: null,
      message: "Sorry Email Already Exist",
      status: "Already Exist",
    });
  } else {
    try {
      // Simpan user baru ke database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Kirim response sukses
      res.status(201).json({
        data: newUser,
        message: "User was successfully register",
        status: "success",
      });
      return;
    } catch (err) {
      // Jika ada error saat create user
      res.status(400).json({
        data: null,
        message: err.message,
        status: "error",
      });
      return;
    }
  }
};

// Controller: LOGIN user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    // Validasi: user harus ada + password harus cocok
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Username atau Password salah!" });
    }

    //jika cocok, buat token jwt
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET_KEY);

    return res.status(200).json({
      message: "Berhasil Login",
      token,
      idUser: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error(error); // log error-nya
    return res.status(500).json({ message: error.message });
  }
};

// Export fungsi register & login
module.exports = {
  register,
  login,
};
