-- CreateTable
CREATE TABLE `Barang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_barang` TEXT NOT NULL,
    `kode_inventaris` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `kondisi` VARCHAR(191) NOT NULL,
    `ruanganId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Barang_kode_inventaris_key`(`kode_inventaris`),
    UNIQUE INDEX `ruanganId`(`ruanganId`),
    UNIQUE INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruangan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_ruanganId_fkey` FOREIGN KEY (`ruanganId`) REFERENCES `Ruangan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
