/*
  Warnings:

  - Made the column `createdAt` on table `coments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `movies_genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `rates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `seasons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `series` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `series_genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `coments` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `genres` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `movies` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `movies_genres` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rates` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `seasons` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `series` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `series_genres` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
