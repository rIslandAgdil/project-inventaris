const prisma = require("../utils/prismaClient");

const findUserByEmail = async (email) => {
  return prisma.user.findFirst({ where: { email } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

module.exports = {
  findUserByEmail,
  createUser,
};
