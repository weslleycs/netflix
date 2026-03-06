/*
  Warnings:

  - You are about to drop the column `genre` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `series` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `seasons` DROP FOREIGN KEY `seasons_seriesId_fkey`;

-- DropIndex
DROP INDEX `seasons_seriesId_fkey` ON `seasons`;

-- AlterTable
ALTER TABLE `genres` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `genre`,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `series` DROP COLUMN `genre`;

-- CreateIndex
CREATE UNIQUE INDEX `genres_name_key` ON `genres`(`name`);

-- CreateIndex
CREATE INDEX `genres_name_idx` ON `genres`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
