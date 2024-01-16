import { User } from "../types/User";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Users: Network response was not ok');
        }
        return await response.json() as User[];
    } catch (error) {
        console.error('There was a problem fetching users:', error);
        throw error;
    }
};

export const fetchUserById = async (userId: number): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json() as User;
    } catch (error) {
        console.error(`There was a problem fetching user ${userId}:`, error);
        throw error;
    }
};
