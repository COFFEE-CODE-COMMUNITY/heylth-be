/*
  Warnings:

  - The primary key for the `eattracker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `screentimetracker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sleeptracker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
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
ALTER TABLE `eattracker` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `screentimetracker` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sleeptracker` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `SleepTracker` ADD CONSTRAINT `SleepTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EatTracker` ADD CONSTRAINT `EatTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScreenTimeTracker` ADD CONSTRAINT `ScreenTimeTracker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
