-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `fname` VARCHAR(256) NOT NULL,
    `lname` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `fname` VARCHAR(256) NOT NULL,
    `lname` VARCHAR(256) NOT NULL,
    `phone` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `publisher_email_key`(`email`),
    UNIQUE INDEX `publisher_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `fname` VARCHAR(256) NOT NULL,
    `lname` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `role` ENUM('master', 'admin') NOT NULL DEFAULT 'admin',

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `author` VARCHAR(256) NOT NULL,
    `rating` ENUM('veryexcellent', 'excellent', 'verygood', 'good', 'nice') NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `categoryid` INTEGER NOT NULL,
    `publisherid` INTEGER NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `createat` DATETIME(3) NOT NULL,
    `totalcost` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderid` INTEGER NOT NULL,
    `status` ENUM('sucessful', 'failed') NOT NULL,
    `createat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderbooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderid` INTEGER NOT NULL,
    `bookid` INTEGER NOT NULL,
    `paymentid` INTEGER NOT NULL,
    `createat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_publisherid_fkey` FOREIGN KEY (`publisherid`) REFERENCES `publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_categoryid_fkey` FOREIGN KEY (`categoryid`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbooks` ADD CONSTRAINT `orderbooks_orderid_fkey` FOREIGN KEY (`orderid`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbooks` ADD CONSTRAINT `orderbooks_bookid_fkey` FOREIGN KEY (`bookid`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbooks` ADD CONSTRAINT `orderbooks_paymentid_fkey` FOREIGN KEY (`paymentid`) REFERENCES `payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
