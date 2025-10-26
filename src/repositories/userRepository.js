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

export const getUsersUsername = async () => await prisma.user.findMany({
    select: { username: true }
});

export const getUserEmail = async () => await prisma.user.findMany({
    select: { email: true }
});

export const getUserData = async data => await prisma.user.findFirst({
    where: { 
        OR: [
            { username: data.username },
            { email: data.email },
        ]
    },
    select: { 
        id: true,
        username: true,
        email: true,
        password: true,
        age: true,
        sex: true
    }
});