-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `serieId` INTEGER NULL,
    `movieId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_serieId_fkey` FOREIGN KEY (`serieId`) REFERENCES `series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- MigrateData: copy all data from coments to comments
INSERT INTO `comments` (`id`, `comment`, `userId`, `serieId`, `movieId`, `createdAt`, `updatedAt`)
SELECT `id`, `coment`, `userId`, `serieId`, `movieId`, `createdAt`, `updatedAt` FROM `coments`;

-- DropForeignKey
ALTER TABLE `coments` DROP FOREIGN KEY `coments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `coments` DROP FOREIGN KEY `coments_serieId_fkey`;

-- DropForeignKey
ALTER TABLE `coments` DROP FOREIGN KEY `coments_movieId_fkey`;

-- DropTable
DROP TABLE `coments`;
