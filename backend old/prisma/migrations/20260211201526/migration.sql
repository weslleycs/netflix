/*
  Warnings:

  - You are about to drop the column `durationMin` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `posterUrl` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `movies` table. All the data in the column will be lost.
  - Added the required column `genre` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `movies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `durationMin`,
    DROP COLUMN `posterUrl`,
    DROP COLUMN `rating`,
    DROP COLUMN `releaseYear`,
    DROP COLUMN `trailerUrl`,
    ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
