-- AlterTable
ALTER TABLE `movies` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `series` ADD COLUMN `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `seasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `season` INTEGER NOT NULL,
    `episodes` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `serieId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
