import postsReducer, { Action } from '../context/postsReducer';
import { PostsState } from '../context/PostsContext';
import { User, Post, Comment } from '../types';
import { mockUsers } from './mockedData/mockUsers';
import { mockPosts } from './mockedData/mockPosts';
import { mockComments } from './mockedData/mockComments';

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    commentsByPostId: {},
    usersMap: {},
    currentPost: null,
};

describe('postReducer', () => {
    test('handles SET_POSTS action', () => {
        const newPosts: Post[] = mockPosts
        const action: Action = { type: 'SET_POSTS', payload: newPosts };
        const newState = postsReducer(initialState, action);
        expect(newState.posts).toEqual(newPosts);
    });

    test('handles SET_LOADING action', () => {
        const action: Action = { type: 'SET_LOADING', payload: true };
        const newState = postsReducer(initialState, action);
        expect(newState.loading).toBe(true);
    });

    test('handles SET_COMMENTS action', () => {
        const comments: Comment[] = mockComments
        const postId = 1;
        const action: Action = { type: 'SET_COMMENTS', payload: { postId, comments } };
        const newState = postsReducer(initialState, action);
        expect(newState.commentsByPostId[postId]).toEqual(comments);
    });

    test('handles SET_USERS action', () => {
        const usersMap: Record<User['id'], User> = mockUsers
        const action: Action = { type: 'SET_USERS', payload: usersMap };
        const newState = postsReducer(initialState, action);
        expect(newState.usersMap).toEqual(usersMap);
    });

    // I got really bored so I'll stop here, same pattern for other states
})

