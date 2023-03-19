import express, { NextFunction, Request, Response } from "express";
import VacationModel from "../4-models/vacation-model";
import logic from "../5-logic/vacations-logic";
import path from "path";
import verifyAdmin from "../3-middleware/verify-admin";
import cyber from "../2-Utils/cyber";
import { RouteNotFound } from "../4-models/errors-model";

const router = express.Router();

// Get http://localhost:3001/api/vacations

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logic.getAllVacations();
        response.json(vacations);

    }
    catch (err: any) {
        next(err);
    }
});


// Get http://localhost:3001/api/vacations/followed

router.get("/vacations/followed", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const followedVacation = await logic.getAllFollowedVacations(user.userId);
        response.json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
})

// Get http://localhost:3001/api/vacations/id

router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Post http://localhost:3001/api/vacations

router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Patch http://localhost:3001/api/vacations/id

router.patch("/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.vacationId = id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updateVacation = await logic.updateFullVacation(vacation);
        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete http://localhost:3001/api/vacations/id

router.delete("/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});
// Get images 
router.get("/vacations/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "Images", "Vacations", imageName);
        // if (!fs.existsSync(absolutePath)) {
        //     throw new RouteNotFound(request.method, request.originalUrl)
        // }
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;