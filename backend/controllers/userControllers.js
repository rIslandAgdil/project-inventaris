const bcrypt = require("bcrypt");
const userRepo = require("../repositories/userRepository");
const { sendSuccess, sendError } = require("../middlewares/response");

exports.getAllUsers = async (_req, res) => {
  try {
    // ambil semua user dari database
    const users = await userRepo.findAllUsers();
    // menghilangkan field password dari response sebelum mengirim ke client
    const sanitized = users.map(({ password, ...data }) => data);
    return sendSuccess(res, "Daftar user", 200, sanitized);
  } catch (error) {
    // Generic server error
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      detail: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    // mencari user ke database berdasarkan id
    const user = await userRepo.findUserById(id);

    // jika user tidak ada
    if (!user) return sendError(res, "User tidak ditemukan", 404);
    return sendSuccess(res, "Detail user", 200, user);
  } catch (error) {
    // Generic server error
    return sendError(res, "Gagal mengambil data user", 500, error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return sendError(res, "username, email, password wajib diisi", 400);
    }
    const hashed = await bcrypt.hash(password, 10);
    const created = await userRepo.createUser({
      username,
      email,
      password: hashed,
    });
    const { password: _pw, ...u } = created;
    return sendSuccess(res, "User dibuat", 201, u);
  } catch (error) {
    return sendError(res, "Gagal membuat user", 500, error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { username, email, password, newPassword } = req.body;

    const current = await userRepo.findUserById(id);
    if (!current) return sendError(res, "User tidak ditemukan", 404);

    //jika password ada, berarti user mau ganti password
    if (password) {
      // pastikan password konfirmasi benar
      const ok = await bcrypt.compare(password, current.password);

      // jika tidak sesuai
      if (!ok) return sendError(res, "Password konfirmasi salah.", 401);

      // jika sesuai, lanjut update password baru
      const hashed = await bcrypt.hash(newPassword, 10);
      try {
        await userRepo.updateUser(id, { password: hashed });
        return sendSuccess(res, "Password diperbarui", 200);
      } catch (error) {
        return sendError(res, "Gagal update password", 500, error);
      }
    }

    // jika tidak ada password, berarti user hanya mau update username/email
    try {
      const updated = await userRepo.updateUser(id, { username, email });
      return sendSuccess(res, "User diperbarui", 200, {
        username: updated.username,
      });
    } catch (error) {
      return sendError(res, "Gagal update user", 500, error);
    }
  } catch (error) {
    return sendError(res, "Gagal update user", 500, error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { confirmPassword } = req.body;

    // mencari user ke database berdasarkan id
    const current = await userRepo.findUserById(id);

    // jika user tidak ada
    if (!current) return sendError(res, "User tidak ditemukan", 404);

    // jika password konfirmasi tidak dikirim
    if (!confirmPassword) {
      return sendError(res, "Password konfirmasi wajib diisi.", 400);
    }

    // pastikan password konfirmasi benar
    const ok = await bcrypt.compare(confirmPassword, current.password);
    if (!ok) return sendError(res, "Password konfirmasi salah.", 401);

    // hapus user
    await userRepo.deleteUser(id);
    return sendSuccess(res, "User dihapus", 200);
  } catch (error) {
    // Handle foreign key constraint error
    if (String(error?.code) === "P2003") {
      return sendError(res, "User masih direferensikan data lain.", 409);
    }
    return sendError(res, "Gagal menghapus user", 500, error);
  }
};
