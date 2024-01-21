import { User } from '../types';
import { getUserByUsername } from '../utils/users';
import { mockUsersMap } from './mockedData/mockUsers';

describe('getUserByUsername', () => {
    it('should return the correct user for a valid username', () => {
        const result = getUserByUsername(mockUsersMap, 'Bret');
        expect(result).toEqual(mockUsersMap["1"]);
    });

    it('should be case-insensitive', () => {
        const result = getUserByUsername(mockUsersMap, 'bret');
        expect(result).toEqual(mockUsersMap["1"]);
    });

    it('should return null for a username that does not exist', () => {
        const result = getUserByUsername(mockUsersMap, 'David');
        expect(result).toBeNull();
    });


});
