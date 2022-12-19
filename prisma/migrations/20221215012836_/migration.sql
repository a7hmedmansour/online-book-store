/*
  Warnings:

  - You are about to drop the `reuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reuest` DROP FOREIGN KEY `Reuest_publisherID_fkey`;

-- DropTable
DROP TABLE `reuest`;

-- CreateTable
CREATE TABLE `Request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publisherID` INTEGER NOT NULL,
    `requset` ENUM('update', 'delete') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_publisherID_fkey` FOREIGN KEY (`publisherID`) REFERENCES `publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
