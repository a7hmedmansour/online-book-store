-- AlterTable
ALTER TABLE `publisher` ADD COLUMN `status` ENUM('Accept', 'Pending', 'reject') NOT NULL DEFAULT 'Pending';
