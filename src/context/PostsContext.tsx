import React, { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react';
import { Post, User, Comment } from '../types';
import postsReducer, { Action } from './postsReducer';

export interface PostsState {
    posts: Post[] | null;
    loading: boolean;
    error: Error | null;
    commentsByPostId: Record<Post['id'], Comment[]>;
    usersMap: Record<User['id'], User>;
    currentPost: Post | null
}

const initialState: PostsState = {
    posts: null,
    loading: false,
    error: null,
    commentsByPostId: {},
    usersMap: {},
    currentPost: null
};

export const PostsContext = createContext<PostsState>(initialState);
export const PostsDispatchContext = createContext<Dispatch<Action> | null>(null);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(postsReducer, initialState);

    const contextValue = { ...state, dispatch };

    return (
        <PostsContext.Provider value={
            contextValue
        }>
            <PostsDispatchContext.Provider value={dispatch}>
                {children}
            </PostsDispatchContext.Provider>
        </PostsContext.Provider >
    );
};

export const usePosts = (): PostsState => useContext(PostsContext);
export const usePostsDispatch = () => useContext(PostsDispatchContext)

