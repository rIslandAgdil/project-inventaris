const { PrismaClient } = require("@prisma/client");

// Gunakan satu instance PrismaClient untuk seluruh aplikasi
const prisma = new PrismaClient();

module.exports = prisma;
