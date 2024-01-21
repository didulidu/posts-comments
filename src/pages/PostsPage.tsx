import React, { useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import SearchPosts from '../components/SearchPosts';
import Header from '../components/Header';
import Loader from '../components/Loader';
import withMessage from '../components/withLogger';
import usePostsActions from '../hooks/usePostsActions';
import PostsList from '../components/PostsList';
import withLogger from '../components/withLogger';

const PostsPage = () => {
    const { posts, loading, error } = usePosts();
    const { getPostsAndUsers, searchPostsByUser } = usePostsActions()

    useEffect(() => {
        getPostsAndUsers()
    }, [])

    if (error) return <div>Error loading posts: {error.message}</div>;

    const performSearch = async (query: string) => {
        searchPostsByUser(query.trim())
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Header title={'Posts'} />
            <SearchPosts onChange={performSearch} />
            {(posts && !posts?.length && <p>No posts </p>)}
            {!loading && posts ? (
                <PostsList posts={posts} />
            ) : (
                <Loader label="Loading posts" />
            )}
        </div>

    );
};

export default withMessage(withLogger(PostsPage));