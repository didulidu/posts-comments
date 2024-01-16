import React from 'react';
import { usePosts } from '../context/PostsContext';
import PostItem from '../components/PostItem';

const PostsPage = () => {
    const { posts, usersMap, loading, error } = usePosts();

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts: {error.message}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className="mb-4 border-b border-gray-200 pb-4">
                        <PostItem onShowComments={() => { }} user={usersMap[post.userId]} post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
