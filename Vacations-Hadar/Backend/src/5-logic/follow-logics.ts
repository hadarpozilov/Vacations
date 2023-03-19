import { OkPacket } from "mysql";
import FollowModel from "../4-models/followVacation-model";
import dal from "../2-Utils/dal";
import socketLogic from "./socket-logic";

// Add follow vacation
async function addFollow(vacationToFollow: FollowModel): Promise<FollowModel> {
    const sql = `INSERT INTO follows(userId, vacationId)
                VALUES(${vacationToFollow.userId}, ${vacationToFollow.vacationId})`;
    const result: OkPacket = await dal.execute(sql);

    const vacations = `UPDATE Vacations 
                            SET followers = followers + 1 
                            WHERE vacationId = ${vacationToFollow.vacationId}`;
    const info: OkPacket = await dal.execute(vacations);
    socketLogic.emitAddFollow(vacationToFollow);
    return vacationToFollow;
}

// Remove follow 
async function removeFollow(follow: FollowModel): Promise<void> {
    const follower = `DELETE FROM follows 
      WHERE vacationId=${follow.vacationId} 
      AND userId=${follow.userId}`;
    const results: OkPacket = await dal.execute(follower);
    const vacations = `UPDATE Vacations 
                                SET followers = followers - 1 
                                WHERE vacationId = ${follow.vacationId}`;
    const info: OkPacket = await dal.execute(vacations);
    socketLogic.emitRemoveFollow(follow);
}

export default {
    addFollow,
    removeFollow,
}