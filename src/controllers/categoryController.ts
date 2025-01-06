import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";
import { errorResponse } from "../utils/errorResponse";

export const createCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({
            status: "success",
            message: "Category created successfully",
            data: category,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to create category", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to create category",
                    "An unknown error occurred while creating category."
                )
            );
        }
    }
};

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            status: "success",
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to fetch categories", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to fetch categories",
                    "An unknown error occurred while fetching categories."
                )
            );
        }
    }
};

export const getCategoryById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(Number(id));
        if (!category) {
            res.status(404).json({
                status: "error",
                message: "Category not found",
            });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch category",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
