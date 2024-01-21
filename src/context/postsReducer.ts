import { Post, User, Comment } from "../types";
import { PostsState } from "./PostsContext";

export type Action =
    | { type: 'SET_POSTS', payload: Post[] }
    | { type: 'SET_LOADING', payload: boolean }
    | { type: 'SET_ERROR', payload: Error | null }
    | { type: 'SET_COMMENTS', payload: { postId: Post['id'], comments: Comment[] } }
    | { type: 'SET_USERS', payload: Record<User['id'], User> }
    | { type: 'SET_CURRENT_POST', payload: Post };

const postsReducer = (state: PostsState, action: Action): PostsState => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_COMMENTS':
            return {
                ...state,
                commentsByPostId: {
                    ...state.commentsByPostId,
                    [action.payload.postId]: action.payload.comments
                }
            };
        case 'SET_USERS':
            return { ...state, usersMap: action.payload };
        case 'SET_CURRENT_POST':
            return {
                ...state,
                currentPost: action.payload
            }
        default:
            return state;
    }
};

export default postsReducer