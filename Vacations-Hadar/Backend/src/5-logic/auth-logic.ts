import { OkPacket } from 'mysql';
import cyber from "../2-Utils/cyber";
import { UnauthorizedError, ValidationError } from '../4-models/errors-model';
import CredentialsModel from '../4-models/credentials-model';
import Role from '../4-models/role';
import UserModel from "../4-models/user-model";
import dal from '../2-Utils/dal';


// Get all users from database
async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);
    return users;
}

async function register(user: UserModel): Promise<string> {
    const errors = user.validateRegister();
    if (errors) {
        throw new ValidationError(errors);
    }

    const dbUsers = getAllUsers();
    const userInDb = (await dbUsers).find(u => u.username === user.username);
    if (userInDb) {
        throw new UnauthorizedError("User already exist");
    }
    user.password = cyber.hash(user.password);

    const sql = `INSERT INTO users VALUES(DEFAULT, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}' , ${user.role = Role.User})`;
    const info: OkPacket = await dal.execute(sql);
    user.userId = info.insertId;
    // delete user.password;
    user.role = 1
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    const errors = credentials.validateLogin();
    if (errors) {
        throw new ValidationError(errors);
    }
    // credentials.password = cyber.hash(credentials.password)
    const password = cyber.hash(credentials.password)

    const sql = `SELECT * from users WHERE username = '${credentials.username}' and password = '${password}'`;
    const users:OkPacket = await dal.execute(sql);
    const token = cyber.getNewToken(users[0]);

    return token;
}

export default {
    register,
    login,
    getAllUsers
}