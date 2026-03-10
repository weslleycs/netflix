/*
  Warnings:

  - You are about to drop the column `moviesId` on the `movies_genres` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `movies_genres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `movies_genres` DROP FOREIGN KEY `movies_genres_moviesId_fkey`;

-- DropIndex
DROP INDEX `movies_genres_moviesId_fkey` ON `movies_genres`;

-- AlterTable
ALTER TABLE `movies_genres` DROP COLUMN `moviesId`,
    ADD COLUMN `movieId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `movies_genres` ADD CONSTRAINT `movies_genres_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
