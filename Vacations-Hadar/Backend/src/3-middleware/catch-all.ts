import { NextFunction, Request, Response } from "express";

async function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    //  if server crashed - error status is 500, error message is "Unknown error":
    
    const status = err.status || 500; 
    const message = err.message || "Unknown Error"; 

    if (status === 500) {
        response.status(status).send(message)
    }

    response.status(status).send(message)

}
export default { catchAll }