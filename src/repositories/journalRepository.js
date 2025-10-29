import prisma from "../config/prisma.js";

export const newJournal = async (data, userId) => await prisma.journalTracker.create({
    data: {
        id: data.id,
        mood: data.mood,
        title: data.title,
        description: data.description,
        userId: userId,
    },
    select: {
        id: true, 
        mood: true,
        title: true,
        description: true,
        createdAt: true,
    }
});