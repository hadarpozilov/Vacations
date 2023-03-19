import { NextFunction, Request, Response } from "express";
import cyber from "../2-Utils/cyber";
import { ForbiddenError, UnauthorizedError } from "../4-models/errors-model";
import Role from "../4-models/role";


async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const user = await cyber.getUserFromToken(request);

        if (user.role === 0) {  

            next()
        }
        else {  

            throw new UnauthorizedError("You are not admin")
        }
    }
    catch (err: any) {
        next(err)
    }
};


export default verifyAdmin;