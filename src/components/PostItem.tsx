import React, { useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { usePosts } from '../context/PostsContext';

interface PostItemProps {
    post: Post;
    user: User;
    onShowComments: (postId: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, user }) => {
    const [showComments, setShowComments] = useState(false);
    const { commentsByPostId, fetchCommentsForPost } = usePosts();
    const [loading, setLoading] = useState(false)

    const handleShowComments = async () => {
        if (!showComments) {
            setLoading(true)
            await fetchCommentsForPost(post.id);
            setLoading(false)
        }
        setShowComments(!showComments);
    };

    return (
        <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>Posted by: {user.name}</p>
            <button
                onClick={handleShowComments}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {loading && <p>Loading comments...</p>}
            {showComments && commentsByPostId[post.id] && (
                <div className="mt-4">
                    <h3 className="font-semibold">Comments:</h3>
                    {commentsByPostId[post.id].map((comment) => (
                        <div key={comment.id} className="mt-2">
                            <p><strong>{comment.name}:</strong> {comment.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>);
};

export default PostItem;

