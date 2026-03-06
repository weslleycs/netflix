-- DropForeignKey
ALTER TABLE `seasons` DROP FOREIGN KEY `seasons_userId_fkey`;

-- DropIndex
DROP INDEX `seasons_userId_fkey` ON `seasons`;

-- AlterTable
ALTER TABLE `seasons` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
