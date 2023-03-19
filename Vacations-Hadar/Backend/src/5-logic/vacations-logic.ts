import { OkPacket } from "mysql";
import { v4 as uuid } from "uuid";
import { ValidationError } from '../4-models/errors-model';
import VacationModel from "../4-models/vacation-model";
import dal from '../2-Utils/dal';
import socketLogic from "./socket-logic";
import { UploadedFile } from "express-fileupload";


function images(image: UploadedFile): string {
    const dotIndex = image.name.lastIndexOf('.');
    const originalExtension = image.name.substring(dotIndex);
    const imageName = uuid() + originalExtension;

    image.mv('./src/1-assets/Images/Vacations/' + imageName);
    return imageName;
}

// Get all vacations 
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT vacationId, vacationDestination, 
                DATE_FORMAT(fromDate, "%d-%m-%Y") AS fromDate, 
                DATE_FORMAT(toDate, "%d-%m-%Y") AS toDate, vacationDescription, vacationImage, followers, vacationPrice from Vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}
// Get one vacation
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT vacationId, vacationDestination, 
    DATE_FORMAT(fromDate, "%d-%m-%Y") AS fromDate, 
    DATE_FORMAT(toDate, "%d-%m-%Y") AS toDate, vacationDescription, vacationImage, followers, vacationPrice from Vacations WHERE vacationId = ` + id;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    socketLogic.emitAddVacation(vacation);
    console.log("user liked vacation: " + vacation.vacationDestination);
    return vacation;
}

// Add vacation 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate post 
    const errors = vacation.validatePost();
    const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf("."));
    vacation.vacationImage = uuid() + extension;

    const sql = `INSERT INTO vacations(vacationDestination, vacationDescription, vacationImage, fromDate, toDate, vacationPrice)
    VALUES('${vacation.vacationDestination}', '${vacation.vacationDescription}', '${vacation.vacationImage}', '${vacation.fromDate}', '${vacation.toDate}', ${vacation.vacationPrice})`;
    const info: OkPacket = await dal.execute(sql);
    vacation.vacationId = info.insertId;
    if (vacation.image) {

        vacation.vacationImage = images(vacation.image);
        delete vacation.image;

    };


    socketLogic.emitAddVacation(vacation);
    return vacation;
}

// Update full vacation
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePatch();
    if (errors) {
        throw new ValidationError(errors)
    }

    const dbVacation = await getOneVacation(vacation.vacationId);
    for (const prop in vacation) {
        if (vacation[prop] === undefined) {
            vacation[prop] = dbVacation[prop]
        }
    }
    if (vacation.image) {
        vacation.vacationImage = images(vacation.image);
        delete vacation.image;

    };
    const sql = `UPDATE vacations SET
                vacationDestination = '${vacation.vacationDestination}',
                vacationDescription = '${vacation.vacationDescription}',
                vacationImage = '${vacation.vacationImage}',
                fromDate = '${vacation.fromDate}',
                toDate = '${vacation.toDate}',
                vacationPrice = ${vacation.vacationPrice}
                WHERE vacationId = ${vacation.vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    socketLogic.emitUpdateVacation(vacation);
    return vacation;
}


// Delete vacation from database:
async function deleteVacation(id: number): Promise<void> {
    const sql = "DELETE FROM vacations WHERE vacationId = " + id;
    const info: OkPacket = await dal.execute(sql);
    socketLogic.emitDeleteVacation(id);
}

// Get all followed vacations:
async function getAllFollowedVacations(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT Vacations.vacationId, vacationDestination,
                    DATE_FORMAT(fromDate, "%Y-%m-%d") AS fromDate, 
                    DATE_FORMAT(toDate, "%Y-%m-%d") AS toDate, vacationDescription, vacationImage, vacationDestination, followers, vacationPrice 
                    FROM Vacations 
                    JOIN follows on Vacations.vacationId = follows.vacationId 
                    WHERE userId = ${userId}`;
    const allFollowedVacations = await dal.execute(sql);
    return allFollowedVacations;
}


export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    deleteVacation,
    getAllFollowedVacations
}

