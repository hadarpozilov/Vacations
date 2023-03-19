import express, { NextFunction, Request,  Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import logic from "../5-logic/auth-logic";

const router = express.Router();

// Get http://localhost:3001/api/auth/users
router.get("/auth/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await logic.getAllUsers();
        response.json(users);
    } catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await logic.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await logic.login(credentials);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;