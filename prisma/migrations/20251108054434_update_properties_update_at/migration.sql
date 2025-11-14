-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL DEFAULT 'L',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sleepStart" INTEGER NOT NULL,
    "sleepEnd" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleepTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EatTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "meal_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EatTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScreenTimeTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScreenTimeTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "mood" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReminderTracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sleepStatus" TEXT NOT NULL,
    "eatStatus" TEXT NOT NULL,
    "screenTimeStatus" TEXT NOT NULL,
    "sleepMessage" TEXT NOT NULL,
    "eatMessage" TEXT NOT NULL,
    "screenTimeMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReminderTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "SleepTracker" ADD CONSTRAINT "SleepTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EatTracker" ADD CONSTRAINT "EatTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScreenTimeTracker" ADD CONSTRAINT "ScreenTimeTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalTracker" ADD CONSTRAINT "JournalTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReminderTracker" ADD CONSTRAINT "ReminderTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
