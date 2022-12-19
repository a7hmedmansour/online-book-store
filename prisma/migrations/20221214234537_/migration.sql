/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderbooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_userid_fkey`;

-- DropForeignKey
ALTER TABLE `orderbooks` DROP FOREIGN KEY `orderbooks_bookid_fkey`;

-- DropForeignKey
ALTER TABLE `orderbooks` DROP FOREIGN KEY `orderbooks_orderid_fkey`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `orderbooks`;

-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `Reuest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publisherID` INTEGER NOT NULL,
    `requset` ENUM('update', 'delete') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reuest` ADD CONSTRAINT `Reuest_publisherID_fkey` FOREIGN KEY (`publisherID`) REFERENCES `publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
