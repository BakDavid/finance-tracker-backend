import prisma from "../config/prismaClient";
import { Category } from "@prisma/client";

export const createCategory = async (data: Category) => {
    return await prisma.category.create({
        data,
    });
};

export const getAllCategories = async () => {
    return await prisma.category.findMany();
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
        return await prisma.category.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error(
            "Failed to fetch category: " + (error as Error).message
        );
    }
};
