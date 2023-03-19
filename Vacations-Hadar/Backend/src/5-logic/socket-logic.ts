import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import FollowModel from "../4-models/followVacation-model";
import VacationModel from '../4-models/vacation-model';

let socketIoServer: SocketIoServer;

function listen(httpServer: HttpServer): void {

    socketIoServer = new SocketIoServer(httpServer, {cors: { origin: "*" }});

    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected...");
        socket.on("disconnect", () => {
            console.log("user has been disconnected");
        });
    });
}


function emitAddVacation(vacation: VacationModel): void {
    socketIoServer.sockets.emit("admin-add-vacation", vacation);
}

function emitUpdateVacation(vacation: VacationModel): void {
    socketIoServer.sockets.emit("admin-update-vacation", vacation);
}

function emitDeleteVacation(id: number): void {
    socketIoServer.sockets.emit("admin-delete-vacation", id);
}


function emitAddFollow(follow: FollowModel): void {
    socketIoServer.sockets.emit("user-add-follow", follow);
}

function emitRemoveFollow(follow: FollowModel): void {
    socketIoServer.sockets.emit("user-remove-follow", follow);
}

function emitFollowedVacations(vacation: VacationModel): void {
    socketIoServer.sockets.emit("user-followed-vacations", vacation);
    console.log("emitFollowedVacations");
}

export default {
    listen,
    emitAddVacation, 
    emitUpdateVacation,
    emitDeleteVacation,
    emitAddFollow,
    emitRemoveFollow,
    emitFollowedVacations
}