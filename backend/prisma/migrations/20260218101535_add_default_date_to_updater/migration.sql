/*
  Warnings:

  - You are about to alter the column `genre` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `movies` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `genre` ENUM('ACTION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'HORROR', 'THRILLER', 'ROMANCE', 'SCIFI', 'FANTASY', 'ANIMATION', 'DOCUMENTARY', 'CRIME', 'MYSTERY', 'FAMILY', 'BIOGRAPHY', 'WAR', 'MUSICAL') NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
