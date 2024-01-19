import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment'
import { fetchPostById, fetchPosts } from '../services/postService';
import { fetchUsers } from '../services/userService';
import { User } from '../types/User';
import { fetchCommentsByPost } from '../services/commentService';
import useCache from '../hooks/useCache';

interface PostsContextData {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    getPostsAndUsers: () => Promise<void>;
    usersMap: Record<Post['id'], User>
    getCommentsForPost: (postId: Post['id']) => Promise<void>;
    commentsByPostId: Record<Post['id'], Comment[]>
    searchPostsByUser: (username?: User['username']) => Promise<void>;
    getPostById: (id: Post['id']) => Promise<Post | null>
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
    const [usersMap, setUsersMap] = useState<Record<User['id'], User>>({});

    const { setItem: setCache, getItem: getCache } = useCache();


    const searchPostsByUser = useCallback(async (username?: User['username']) => {
        setLoading(true);
        setError(null);

        try {
            const userId = Object.values(usersMap).find(user => {
                return user.username.toLowerCase() === username?.toLowerCase()
            })
            const postsData = await fetchPosts(userId?.id)

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
    }, [usersMap])

    const getPostsAndUsers = useCallback(async () => {
        const cachedData = getCache('postsAndUsers');
        if (cachedData) {
            const { cachedPosts, cachedUsersMap } = cachedData;
            setPosts(cachedPosts);
            setUsersMap(cachedUsersMap);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);

            const newUsersMap = usersData.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<User['id'], User>);

            setUsersMap(newUsersMap);
            setPosts(postsData);
            setCache('postsAndUsers', { cachedPosts: posts, cachedUsersMap: usersMap });
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

    const getCommentsForPost = async (postId: Post['id']) => {
        const cachedComments = getCache(`commentsForPost-${postId}`);
        if (cachedComments) {
            setCommentsByPostId(prevComments => {
                return { ...prevComments, [postId]: cachedComments };
            });
            return
        }
        try {
            const comments = await fetchCommentsByPost(postId)
            setCommentsByPostId(prevComments => {
                return { ...prevComments, [postId]: comments };
            });
            setCache(`commentsForPost-${postId}`, comments)

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


    const getPostById = async (id: Post['id']) => {
        try {
            const post = await fetchPostById(id);
            return post;
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    };

    useEffect(() => {
        getPostsAndUsers();
    }, [getPostsAndUsers]);

    return (
        <PostsContext.Provider value={{
            getPostById,
            searchPostsByUser,
            commentsByPostId,
            getCommentsForPost,
            posts,
            usersMap,
            loading,
            error,
            getPostsAndUsers
        }}>
            {children}
        </PostsContext.Provider>
    );
};
