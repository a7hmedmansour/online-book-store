/*
  Warnings:

  - Added the required column `image` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
