import { addFollowAction, deleteFollowAction } from './../Redux/FollowState';
import { Socket, io } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import  store  from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import authService from "./AuthService";
import FollowModel from '../Models/FollowModel';



class SocketIoServer {
    private socket: Socket;

    public connect(): void {

        // Connect to socket server:
        this.socket = io("http://localhost:3001");

        if (authService.isAdmin()) return;
        

        // Listen to adding a vacation by admin:
        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            store.dispatch(addVacationAction(vacation));
        });

        // Listen to updating a vacation by admin:
        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            store.dispatch(updateVacationAction(vacation));
            console.log("admin-update-vacation");
            
        });

        // Listen to deleting a vacation by admin:
        this.socket.on("admin-delete-vacation", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });

        // Listen to adding a vacation by user:
        this.socket.on("user-add-follow", (follow: FollowModel) => {
            store.dispatch(addFollowAction(follow));
            console.log("user-add-follow");
            
        });

        // Listen to removing a vacation by user:
        this.socket.on("user-remove-follow", (follow: FollowModel) => {
            store.dispatch(deleteFollowAction(follow));

        }
        );

        // Listen to followed vacations by user:
        this.socket.on("user-followed-vacations", (vacation: VacationModel) => {
            store.dispatch(updateVacationAction(vacation));
            console.log("user-followed-vacations");
        });
        
    }
    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoServer();

export default socketIoService;