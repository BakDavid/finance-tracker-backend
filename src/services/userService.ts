import prisma from "../config/prismaClient";
import { User } from "@prisma/client";

export const createUser = async (data: User) => {
    return await prisma.user.create({
        data,
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error("Failed to fetch user: " + (error as Error).message);
    }
};
