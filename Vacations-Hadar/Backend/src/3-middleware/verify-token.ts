import { NextFunction, Request, Response } from "express";
import cyber from "../2-Utils/cyber";

async function verifyToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        await cyber.verifyToken(request);
        next()
    }
    catch (err: any) {
        next(err)
    }
}

export default verifyToken;