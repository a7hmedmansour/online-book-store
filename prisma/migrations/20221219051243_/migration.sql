/*
  Warnings:

  - You are about to drop the column `token` on the `tokenaccess` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `tokenaccess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokenaccess` DROP COLUMN `token`,
    ADD COLUMN `user_id` INTEGER NOT NULL;
