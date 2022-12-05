/*
  Warnings:

  - You are about to drop the column `rating` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `paymentid` on the `orderbooks` table. All the data in the column will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderbooks` DROP FOREIGN KEY `orderbooks_paymentid_fkey`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `rating`;

-- AlterTable
ALTER TABLE `orderbooks` DROP COLUMN `paymentid`;

-- DropTable
DROP TABLE `payment`;

-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(256) NOT NULL,
    `lname` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookrank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookid` INTEGER NOT NULL,
    `sold` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `bookid` INTEGER NOT NULL,
    `review` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookrank` ADD CONSTRAINT `bookrank_bookid_fkey` FOREIGN KEY (`bookid`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookrank` ADD CONSTRAINT `bookrank_category_fkey` FOREIGN KEY (`category`) REFERENCES `category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_bookid_fkey` FOREIGN KEY (`bookid`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
