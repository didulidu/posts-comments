import { HttpService } from './httpService'; // Adjust the import path as needed
import { Post, User } from "../types";

class PostService extends HttpService {

    async fetchPosts(userId?: User['id']): Promise<Post[]> {
        try {
            let apiUrl = '/posts';
            if (userId) {
                apiUrl += `?userId=${userId}`;
            }
            const posts = await this.get<Post[]>(apiUrl);
            return posts;
        } catch (error) {
            console.error('There was a problem fetching posts:', error);
            throw error;
        }
    }

    async fetchPostById(postId: Post['id']): Promise<Post> {
        try {
            const post = await this.get<Post>(`/posts/${postId}`);
            return post;
        } catch (error) {
            console.error(`There was a problem fetching post ${postId}:`, error);
            throw error;
        }
    }
}

export default new PostService();
