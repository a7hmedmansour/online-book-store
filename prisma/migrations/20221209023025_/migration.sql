-- AlterTable
ALTER TABLE `publisher` ADD COLUMN `company` VARCHAR(256) NOT NULL DEFAULT 'null';

-- CreateTable
CREATE TABLE `bookadder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `author` VARCHAR(256) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `categoryid` INTEGER NOT NULL,
    `publisherid` INTEGER NOT NULL,
    `publisheddate` DATETIME(3) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookadder` ADD CONSTRAINT `bookadder_publisherid_fkey` FOREIGN KEY (`publisherid`) REFERENCES `publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookadder` ADD CONSTRAINT `bookadder_categoryid_fkey` FOREIGN KEY (`categoryid`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
