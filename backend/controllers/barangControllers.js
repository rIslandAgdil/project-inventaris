const barangRepo = require("../repositories/barangRepository");
const { sendSuccess, sendError } = require("../middlewares/response");

// tambahkan barang
exports.createBarang = async (req, res) => {
  try {
    const { nama_barang, kode_inventaris, jumlah, kondisi, ruanganId, userId } =
      req.body;
    const payload = {
      nama_barang,
      kode_inventaris,
      jumlah: Number(jumlah),
      kondisi,
      ruanganId: Number(ruanganId),
      userId: Number(userId),
    };

    const barang = await barangRepo.createBarang(payload);
    return sendSuccess(res, "Barang berhasil ditambahkan", 201, barang);
  } catch (error) {
    return sendError(res, "Gagal menambah barang", 500, error);
  }
};

//read - semua barang
exports.getBarang = async (req, res) => {
  try {
    const barang = await barangRepo.getAllBarang();
    return sendSuccess(res, "Daftar barang", 200, barang);
  } catch (error) {
    return sendError(res, "Gagal mengambil data barang", 500, error);
  }
};

//read barang by id - buat coba aja sih - bagusnya kembangkan ke fitur search
exports.getBarangById = async (req, res) => {
  try {
    const { id } = req.params;
    const barang = await barangRepo.getBarangById(Number(id));
    if (!barang) return sendError(res, "Barang tidak ditemukan", 404);
    return sendSuccess(res, "Detail barang", 200, barang);
  } catch (error) {
    return sendError(res, "Gagal mengambil detail barang", 500, error);
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, kode_inventaris, jumlah, kondisi, ruanganId } =
      req.body;
    const payload = {
      nama_barang,
      kode_inventaris,
      jumlah: Number(jumlah),
      kondisi,
      ruanganId: Number(ruanganId),
    };

    const barang = await barangRepo.updateBarang(Number(id), payload);
    return sendSuccess(res, "Data Barang Berhasil diupdate", 200, barang);
  } catch (error) {
    return sendError(res, "Gagal update barang", 500, error);
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;
    await barangRepo.deleteBarang(Number(id));
    return sendSuccess(res, "Barang Berhasil Dihapus", 200);
  } catch (error) {
    return sendError(res, "Gagal menghapus barang", 500, error);
  }
};
