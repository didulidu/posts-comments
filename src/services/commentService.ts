import { HttpService } from './httpService';
import { Comment, Post } from "../types";


class CommentService extends HttpService {

    async fetchCommentsByPost(postId: Post['id']): Promise<Comment[]> {
        try {
            const comments = await this.get<Comment[]>(`/comments?postId=${postId}`);
            return comments;
        } catch (error) {
            console.error('There was a problem fetching comments:', error);
            throw error;
        }
    }

    async fetchCommentById(commentId: Comment['id']): Promise<Comment> {
        try {
            const comment = await this.get<Comment>(`/comments/${commentId}`);
            return comment;
        } catch (error) {
            console.error(`There was a problem fetching comment ${commentId}:`, error);
            throw error;
        }
    }
}

export default new CommentService();
