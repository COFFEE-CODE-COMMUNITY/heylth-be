/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `ReminderTracker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `ReminderTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReminderTracker" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReminderTracker_userId_date_key" ON "ReminderTracker"("userId", "date");
