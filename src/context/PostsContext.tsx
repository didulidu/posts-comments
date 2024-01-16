import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment'
import { fetchPosts } from '../services/postService';
import { fetchUsers } from '../services/userService';
import { User } from '../types/User';
import { fetchCommentsByPost } from '../services/commentService';

interface PostsContextData {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    fetchPostsAndUsers: () => Promise<void>;
    usersMap: Record<Post['id'], User>
    fetchCommentsForPost: (postId: number) => Promise<void>;
    commentsByPostId: Record<Post['id'], Comment[]>
}

const PostsContext = createContext<PostsContextData | undefined>(undefined);

export const usePosts = (): PostsContextData => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [commentsByPostId, setCommentsByPostId] = useState<Record<Post['id'], Comment[]>>({});


    const [usersMap, setUsersMap] = useState<Record<number, User>>({});

    const fetchPostsAndUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);

            const newUsersMap = usersData.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<number, User>);

            setUsersMap(newUsersMap);
            setPosts(postsData);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCommentsForPost = async (postId: Post['id']) => {
        try {
            const comments = await fetchCommentsByPost(postId)
            setCommentsByPostId(prevComments => {
                return { ...prevComments, [postId]: comments };
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            console.log("Finally")
        }
    }


    useEffect(() => {
        fetchPostsAndUsers();
    }, [fetchPostsAndUsers]);

    return (
        <PostsContext.Provider value={{ commentsByPostId, fetchCommentsForPost, posts, usersMap, loading, error, fetchPostsAndUsers }}>
            {children}
        </PostsContext.Provider>
    );
};
