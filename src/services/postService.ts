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

export const fetchPostById = (postId: Post['id']): Promise<Post> => {
    const fetchPromise = fetch(`${API_BASE_URL}/posts/${postId}`)
        .then(response => response.json() as Promise<Post>);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchPromise.then(resolve).catch(reject);
        }, 3000);
    });
};
