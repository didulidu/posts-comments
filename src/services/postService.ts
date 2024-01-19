import { Post } from "../types/Post";
import { User } from "../types/User";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async (userId?: User['id']): Promise<Post[]> => {
    try {
        let apiUrl = `${API_BASE_URL}/posts`
        if (userId) {
            apiUrl += `?userId=${userId}`
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as Post[];
    } catch (error) {
        console.error('There was a problem fetching posts:', error);
        throw error;
    }
};

export const fetchPostById = async (postId: Post['id']): Promise<Post> => {
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
