import axios from "axios";
import FollowModel from "../Models/FollowModel";
import config from "../Utils/Config";

class FollowService {

    // Follow vacation
    public async addFollow(id: number): Promise<FollowModel> {
        const response = await axios.post<FollowModel>(config.addFollow + id);
        const followedVacation = response.data;
        return followedVacation;

    }

    // Delete follow 
    public async removeFollow(id: number): Promise<void> {
        const response = await axios.delete(config.removeFollow + id);
    }
}


const followService = new FollowService();

export default followService;
