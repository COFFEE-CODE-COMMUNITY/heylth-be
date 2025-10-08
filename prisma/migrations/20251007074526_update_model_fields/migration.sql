-- DropForeignKey
ALTER TABLE `eattracker` DROP FOREIGN KEY `EatTracker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `screentimetracker` DROP FOREIGN KEY `ScreenTimeTracker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sleeptracker` DROP FOREIGN KEY `SleepTracker_userId_fkey`;

-- DropIndex
DROP INDEX `EatTracker_userId_fkey` ON `eattracker`;

-- DropIndex
DROP INDEX `ScreenTimeTracker_userId_fkey` ON `screentimetracker`;

-- DropIndex
DROP INDEX `SleepTracker_userId_fkey` ON `sleeptracker`;

-- AlterTable
ALTER TABLE `eattracker` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `screentimetracker` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sleeptracker` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `SleepTracker` ADD CONSTRAINT `SleepTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EatTracker` ADD CONSTRAINT `EatTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScreenTimeTracker` ADD CONSTRAINT `ScreenTimeTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
