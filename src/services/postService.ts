import { Post } from "../types/Post";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as Post[];
    } catch (error) {
        console.error('There was a problem fetching posts:', error);
        throw error;
    }
};

export const fetchPostById = async (postId: number): Promise<Post> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as Post;
    } catch (error) {
        console.error(`There was a problem fetching post ${postId}:`, error);
        throw error;
    }
};
