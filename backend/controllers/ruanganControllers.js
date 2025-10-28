const ruanganRepo = require("../repositories/ruanganRepository");
const { sendSuccess, sendError } = require("../middlewares/response");

// tambahkan ruangan
exports.createRuangan = async (req, res) => {
  try {
    const { nama_ruangan } = req.body;
    const ruangan = await ruanganRepo.createRuangan({ nama_ruangan });
    return sendSuccess(res, "Ruangan berhasil ditambahkan", 201, ruangan);
  } catch (error) {
    return sendError(res, "Gagal menambah ruangan", 500, error);
  }
};

//read - semua barang
exports.getAllRuangan = async (req, res) => {
  try {
    const ruangan = await ruanganRepo.getAllRuangan();
    return sendSuccess(res, "Daftar ruangan", 200, ruangan);
  } catch (error) {
    return sendError(res, "Gagal mengambil data ruangan", 500, error);
  }
};

//read - semua barang
exports.getRuanganById = async (req, res) => {
  try {
    const { id } = req.params;
    const ruangan = await ruanganRepo.getRuanganById(Number(id));
    if (!ruangan) return sendError(res, "Ruangan tidak ditemukan", 404);
    return sendSuccess(res, "Detail ruangan", 200, ruangan);
  } catch (error) {
    return sendError(res, "Gagal mengambil detail ruangan", 500, error);
  }
};

exports.updateRuangan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_ruangan } = req.body;
    const ruangan = await ruanganRepo.updateRuangan(Number(id), {
      nama_ruangan,
    });
    return sendSuccess(res, "Data Ruangan Berhasil diupdate", 200, ruangan);
  } catch (error) {
    return sendError(res, "Gagal update ruangan", 500, error);
  }
};

exports.deleteRuangan = async (req, res) => {
  try {
    const { id } = req.params;
    await ruanganRepo.deleteRuangan(Number(id));
    return sendSuccess(res, "Ruangan Berhasil Dihapus", 200);
  } catch (error) {
    return sendError(res, "Gagal menghapus ruangan", 500, error);
  }
};
