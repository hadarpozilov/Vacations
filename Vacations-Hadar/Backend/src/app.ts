import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import sanitize from './3-middleware/sanitize';
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";
import followsController from "./6-controllers/follow-controller";
import { RouteNotFound } from "./4-models/errors-model";
import catchAll from './3-middleware/catch-all';
import config from "./2-Utils/config";
import socketLogic from "./5-logic/socket-logic";

const expressServer = express();
expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(sanitize);
expressServer.use(expressFileUpload());
expressServer.use("/api", authController);
expressServer.use("/api", vacationsController);
expressServer.use("/api", followsController);
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    const err = new RouteNotFound(request.method, request.originalUrl);
    next(err);
});
expressServer.use(catchAll.catchAll);
const httpServer = expressServer.listen(config.port, () => console.log("Listening... "));
socketLogic.listen(httpServer);