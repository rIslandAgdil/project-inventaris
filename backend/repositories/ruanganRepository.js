const prisma = require("../utils/prismaClient");

const createRuangan = async (data) => {
  return prisma.ruangan.create({ data });
};

const getAllRuangan = async () => {
  return prisma.ruangan.findMany();
};

const getRuanganById = async (id) => {
  return prisma.ruangan.findUnique({ where: { id } });
};

const updateRuangan = async (id, data) => {
  return prisma.ruangan.update({ where: { id }, data });
};

const deleteRuangan = async (id) => {
  return prisma.ruangan.delete({ where: { id } });
};

module.exports = {
  createRuangan,
  getAllRuangan,
  getRuanganById,
  updateRuangan,
  deleteRuangan,
};
