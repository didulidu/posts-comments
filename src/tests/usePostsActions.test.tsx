/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import usePostsActions from '../hooks/usePostsActions';
import * as PostContext from '../context/PostsContext';
import postService from '../services/postService';
import userService from '../services/userService';
import { ContextType } from 'react';
import { mockPosts } from './mockedData/mockPosts';
import { mockUsers } from './mockedData/mockUsers';

jest.mock('../services/postService');
jest.mock('../services/userService');

postService.fetchPosts = jest.fn();
userService.fetchUsers = jest.fn();

const mockDispatch = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: (context: ContextType<any>) => {
        if (context === PostContext.PostsDispatchContext) {
            return mockDispatch;
        }
        return jest.requireActual('react').useContext(context);
    }
}));

describe('usePostsActions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getPostsAndUsers dispatches correct actions on success', async () => {

        (postService.fetchPosts as jest.Mock).mockResolvedValue(mockPosts);
        (userService.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => usePostsActions());

        await act(async () => {
            await result.current.getPostsAndUsers();
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_USERS', payload: expect.any(Object) });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_POSTS', payload: mockPosts });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });
    });
});
