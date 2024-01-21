import userService from '../services/userService';
import { mockUsers } from './mockedData/mockUsers';

userService.get = jest.fn();

describe('userService test', () => {
    test('fetches users successfully', async () => {
        (userService.get as jest.Mock).mockResolvedValue(mockUsers);

        const result = await userService.fetchUsers();
        expect(result).toEqual(mockUsers);
        expect(userService.get).toHaveBeenCalledWith('/users');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})