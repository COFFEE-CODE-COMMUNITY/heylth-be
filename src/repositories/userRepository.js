import prisma from '../config/prisma.js';

export const createUser = async data => await prisma.user.create({
    data: {
        id: data.id,
        email: data.email,
        username: data.username,
        password: data.password,
        age: data.age,
        sex: data.sex
    }
});

export const getAllUsername = async () => await prisma.user.findMany({
    select: { username: true }
});

export const getAllEmail = async () => await prisma.user.findMany({
    select: { email: true }
});