const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.getAllUsers = async (_req, res) => {
  try {
    // ambil semua user dari database
    const users = await prisma.user.findMany({ orderBy: { id: "asc" } });

    // menghilangkan field password dari response
    // sebelum mengirim ke client
    const sanitized = users.map(({ password, ...data }) => data);

    // mengirim data user ke client
    res.json(sanitized);
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
    const user = await prisma.user.findUnique({ where: { id } });

    // jika user tidak ada
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // mengirim data user ke client
    res.status(200).json(user);
  } catch (error) {
    // Generic server error
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      detail: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email, password wajib diisi" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({
      data: { username, email, password: hashed },
    });
    const { password: _pw, ...u } = created;
    res.status(201).json({ message: "User dibuat", data: u });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { username, email, password, newPassword } = req.body;

    const current = await prisma.user.findUnique({ where: { id } });
    if (!current)
      return res.status(404).json({ error: "User tidak ditemukan" });

    //jika password ada, berarti user mau ganti password
    if (password) {
      // pastikan password konfirmasi benar
      const ok = await bcrypt.compare(password, current.password);

      // jika tidak sesuai
      if (!ok)
        return res.status(401).json({ error: "Password konfirmasi salah." });

      // jika sesuai, lanjut update password baru
      const hashed = await bcrypt.hash(newPassword, 10);
      try {
        await prisma.user.update({
          where: { id },
          data: { password: hashed },
        });

        return res.status(200).json({
          message: "Password diperbarui",
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    // jika tidak ada password, berarti user hanya mau update username/email
    try {
      const updated = await prisma.user.update({
        where: { id },
        data: { username, email },
      });

      res
        .status(200)
        .json({ message: "User diperbarui", username: updated.username });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { confirmPassword } = req.body;

    // mencari user ke database berdasarkan id
    const current = await prisma.user.findUnique({ where: { id } });

    // jika user tidak ada
    if (!current)
      return res.status(404).json({ error: "User tidak ditemukan" });

    // jika password konfirmasi tidak dikirim
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password konfirmasi wajib diisi." });
    }

    // pastikan password konfirmasi benar
    const ok = await bcrypt.compare(confirmPassword, current.password);
    if (!ok)
      return res.status(401).json({ error: "Password konfirmasi salah." });

    // hapus user
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User dihapus" });
  } catch (error) {
    // Handle foreign key constraint error
    if (String(error?.code) === "P2003") {
      return res
        .status(409)
        .json({ error: "User masih direferensikan data lain." });
    }
    // Generic server error
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      detail: error.message,
    });
  }
};
