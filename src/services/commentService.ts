import { Comment } from "../types/Comment";
import { Post } from "../types/Post";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchCommentsByPost = async (postId: Post['id']): Promise<Comment[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments?postId=${postId}`);
        if (!response.ok) {
            throw new Error('Comments: Network response was not ok');
        }
        return await response.json() as Comment[];
    } catch (error) {
        console.error('There was a problem fetching comments:', error);
        throw error;
    }
};

export const fetchCommentById = async (commentId: Comment['id']): Promise<Comment> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json() as Comment;
    } catch (error) {
        console.error(`There was a problem fetching user ${commentId}:`, error);
        throw error;
    }
};
