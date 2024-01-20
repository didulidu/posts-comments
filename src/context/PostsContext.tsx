import React, { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment'
import { User } from '../types/User';
import postsReducer, { Action } from './postsReducer';

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    commentsByPostId: Record<Post['id'], Comment[]>;
    usersMap: Record<User['id'], User>;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    commentsByPostId: {},
    usersMap: {},
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

