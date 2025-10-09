const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const parseId = (raw) => (Number.isNaN(Number(raw)) ? raw : Number(raw));

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
    const sanitized = users.map(({ password, ...u }) => u);
    res.json({ data: sanitized });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
    const { password, ...u } = user;
    res.json({ data: u });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email, password wajib diisi" });
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
    const id = parseInt(req.params.id, 10);
    const { username, email, confirmPassword } = req.body;

    const current = await prisma.user.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: "User tidak ditemukan" });

    if (!confirmPassword) {
      return res.status(400).json({ error: "Password konfirmasi wajib diisi." });
    }
    const ok = await bcrypt.compare(confirmPassword, current.password);
    if (!ok) return res.status(401).json({ error: "Password konfirmasi salah." });

    const updated = await prisma.user.update({
      where: { id },
      data: { username, email },
    });
    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { confirmPassword } = req.body;

    const current = await prisma.user.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: "User tidak ditemukan" });

    if (!confirmPassword) {
      return res.status(400).json({ error: "Password konfirmasi wajib diisi." });
    }
    const ok = await bcrypt.compare(confirmPassword, current.password);
    if (!ok) return res.status(401).json({ error: "Password konfirmasi salah." });

    // (opsional) cegah hapus jika masih direferensikan
    const barangCount = await prisma.barang.count({ where: { userId: id } });
    if (barangCount > 0) {
      return res.status(409).json({
        error: `Tidak bisa dihapus: masih dipakai pada ${barangCount} data barang.`,
      });
    }

    await prisma.user.delete({ where: { id } });
    res.json({ message: "User dihapus" });
  } catch (error) {
    if (String(error?.code) === "P2003") {
      return res.status(409).json({ error: "User masih direferensikan data lain." });
    }
    res.status(500).json({ error: error.message });
  }
};