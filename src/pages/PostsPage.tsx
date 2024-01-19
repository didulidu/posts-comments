import React from 'react';
import { usePosts } from '../context/PostsContext';
import PostItem from '../components/PostItem';
import SearchPosts from '../components/SearchPosts';
import Header from '../components/Header';
import Loader from '../components/Loader';
import withMessage from '../context/withMessage';

const PostsPage = () => {
    const { posts, usersMap, loading, error, searchPostsByUser } = usePosts();

    if (error) return <div>Error loading posts: {error.message}</div>;

    const performSearch = async (query: string) => {
        if (query.trim()) {
            searchPostsByUser(query.trim())
        }
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
