const prisma = require("../utils/prismaClient");

const findAllUsers = async () => {
  return prisma.user.findMany({ orderBy: { id: "asc" } });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const findUserByEmail = async (email) => {
  return prisma.user.findFirst({ where: { email } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
