import React, { useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import PostItem from '../components/PostItem';
import SearchPosts from '../components/SearchPosts';
import Header from '../components/Header';
import Loader from '../components/Loader';
import withMessage from '../components/withMessage';
import usePostsActions from '../hooks/usePostsActions';

const PostsPage = () => {
    const { posts, usersMap, loading, error } = usePosts();
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
            {!loading ? (
                <div className="space-y-8">
                    {posts.map((post) => (
                        <div key={post.id}>
                            <PostItem onShowComments={() => { }} user={usersMap[post.userId]} post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <Loader label="Loading posts" />
            )}
        </div>

    );
};

export default withMessage(PostsPage);
