import { useCallback, useContext } from 'react';
import { PostsContext, PostsDispatchContext } from '../context/PostsContext';
import { fetchPostById, fetchPosts } from '../services/postService';
import { fetchUsers } from '../services/userService';
import { User } from '../types/User';
import { fetchCommentsByPost } from '../services/commentService';
import { Post } from '../types/Post';
import useCache from './useCache';

const usePostsActions = () => {
    const { usersMap } = useContext(PostsContext);
    const dispatch = useContext(PostsDispatchContext)
    const { getItem, setItem } = useCache()

    const getPostsAndUsers = useCallback(async () => {
        dispatch?.({ type: 'SET_LOADING', payload: true });
        try {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);

            const newUsersMap = usersData.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<User['id'], User>);

            dispatch?.({ type: 'SET_USERS', payload: newUsersMap });
            dispatch?.({ type: 'SET_POSTS', payload: postsData });
        } catch (err) {
            dispatch?.({ type: 'SET_ERROR', payload: err instanceof Error ? err : new Error('Error fetching posts and users') });
        } finally {
            dispatch?.({ type: 'SET_LOADING', payload: false });
        }
    }, [dispatch, getItem, setItem]);

    const getCommentsForPost = useCallback(async (postId: Post['id']) => {
        try {
            const cachedComments = getItem(`commentsForPost-${postId}`)
            if (cachedComments) {
                dispatch?.({ type: 'SET_COMMENTS', payload: { postId, comments: cachedComments } });
                return
            }
            const comments = await fetchCommentsByPost(postId);

            setItem(`commentsForPost-${postId}`, comments)
            dispatch?.({ type: 'SET_COMMENTS', payload: { postId, comments } });
        } catch (err) {
            dispatch?.({ type: 'SET_ERROR', payload: err instanceof Error ? err : new Error('Error fetching comments') });
        }
    }, [dispatch]);

    const searchPostsByUser = useCallback(async (username?: User['username']) => {
        dispatch?.({ type: "SET_LOADING", payload: true })

        try {
            const user = Object.values(usersMap).find(user => {
                return user.username.toLowerCase() === username?.toLowerCase()
            })

            const postsData = await fetchPosts(user?.id)


            dispatch?.({ type: "SET_POSTS", payload: postsData })
        } catch (err) {
            if (err instanceof Error) {
                dispatch?.({ type: "SET_ERROR", payload: err })
            } else {
                dispatch?.({ type: "SET_ERROR", payload: new Error('Error searching posts') })
            }
        } finally {
            dispatch?.({ type: "SET_LOADING", payload: false })
        }
    }, [usersMap, dispatch])

    const getPostById = useCallback(async (postId: Post['id']) => {
        try {
            const post = await fetchPostById(postId);
            return post
        } catch (err) {
            if (err instanceof Error) {
                dispatch?.({ type: "SET_ERROR", payload: err })
            } else {
                dispatch?.({ type: "SET_ERROR", payload: new Error('Error fetching post') })
            }
        }
    }, [dispatch]);

    return { getPostsAndUsers, getCommentsForPost, searchPostsByUser, getPostById };
};

export default usePostsActions;
