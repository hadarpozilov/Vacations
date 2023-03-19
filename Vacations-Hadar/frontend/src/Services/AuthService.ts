import store from './../Redux/Store';
import axios from "axios";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import CredentialModel from '../Models/CredentialModel';
import Role from '../Models/Role';

class AuthService {

    public isAdmin(): boolean {
        const user = store.getState().authState.user;
        if (user) {
            const role = user.role;
            if (role === Role.Admin) return true;
            if (role === Role.User) return false;
        }
        return false;
    }

    public isLoggedIn(): boolean {
        return store.getState().authState.token !== null;
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(config.users);
        return response.data;
    }

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.register, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    public async login(credential: CredentialModel): Promise<void> {
        const response = await axios.post<string>(config.login, credential);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }
}

const authService = new AuthService();
export default authService;