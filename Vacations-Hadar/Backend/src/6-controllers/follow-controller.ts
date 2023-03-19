import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-Utils/cyber";
import verifyToken from "../3-middleware/verify-token";
import FollowVacation from "../4-models/followVacation-model";
import logic from "../5-logic/follow-logics";



const router = express.Router();


// Post http://localhost:3001/api/follows/add/:id

router.post("/follows/add/:id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        const user = cyber.getUserFromToken(request);
        const follow = new FollowVacation(user.userId, vacationId);
        const followedVacation = await logic.addFollow(follow);
        response.status(201).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete http://localhost:3001/api/follows/remove/:id

router.delete("/follows/remove/:id",  verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        const user = cyber.getUserFromToken(request);
        const follower = new FollowVacation(user.userId, vacationId);
        await logic.removeFollow(follower);
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }
})


export default router;