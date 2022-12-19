/*
  Warnings:

  - You are about to drop the column `price` on the `bookadder` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookadder` DROP COLUMN `price`,
    MODIFY `publisheddate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `books` DROP COLUMN `price`;
