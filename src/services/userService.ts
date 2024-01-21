import { HttpService } from './httpService';
import { User } from "../types";

class UserService extends HttpService {

    async fetchUsers(): Promise<User[]> {
        try {
            const users = await this.get<User[]>('/users');
            return users;
        } catch (error) {
            console.error('There was a problem fetching users:', error);
            throw error;
        }
    }
}

export default new UserService();
