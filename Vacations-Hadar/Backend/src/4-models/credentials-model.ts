import Joi from "joi";
import Role from "./role";



class CredentialsModel {
    public username: string;
    public password: string;
    // public role: Role;


    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
        // this.role = credentials.role;

    }

    private static loginValidationSchema = Joi.object({
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(5).max(20),
        // role: Joi.number().optional().integer().positive()

    });

    public validateLogin() {
        const result = CredentialsModel.loginValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;