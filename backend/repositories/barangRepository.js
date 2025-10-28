const prisma = require("../utils/prismaClient");

const createBarang = async (payload) => {
  return prisma.barang.create({ data: payload });
};

const getAllBarang = async () => {
  return prisma.barang.findMany({ include: { ruangan: true, user: true } });
};

const getBarangById = async (id) => {
  return prisma.barang.findUnique({ where: { id } });
};

const updateBarang = async (id, payload) => {
  return prisma.barang.update({ where: { id }, data: payload });
};

const deleteBarang = async (id) => {
  return prisma.barang.delete({ where: { id } });
};

module.exports = {
  createBarang,
  getAllBarang,
  getBarangById,
  updateBarang,
  deleteBarang,
};
