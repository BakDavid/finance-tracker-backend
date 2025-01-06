import { Request, Response } from "express";
import * as userService from "../services/userService";
import { errorResponse } from "../utils/errorResponse";

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to create user", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to create user",
                    "An unknown error occurred while creating user."
                )
            );
        }
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to fetch users", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to fetch users",
                    "An unknown error occurred while fetching users."
                )
            );
        }
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(Number(id));
        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch user",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
