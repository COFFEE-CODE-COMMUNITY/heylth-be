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

-- AddForeignKey
ALTER TABLE "JournalTracker" ADD CONSTRAINT "JournalTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
