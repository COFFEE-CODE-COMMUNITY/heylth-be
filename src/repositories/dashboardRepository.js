import prisma from "../config/prisma.js";

export const findScreenTimeData = async (userId) => await prisma.screenTimeTracker.findMany({
    where: { userId: userId },
    select: {
        userId: true,
        duration: true,
        createdAt: true,
    },
    orderBy: { createdAt: "asc"},
});
