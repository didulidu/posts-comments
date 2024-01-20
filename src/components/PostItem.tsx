import React, { useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { usePosts } from '../context/PostsContext';
import { ChevronForwardOutline } from 'react-ionicons'
import { useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import Container from './Container';
import withMessage from './withMessage'
import usePostsActions from '../hooks/usePostsActions';


interface PostItemProps {
    post: Post;
    user: User;
    onShowComments: (postId: Post['id']) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, user }) => {
    const [showComments, setShowComments] = useState(false);
    const { commentsByPostId } = usePosts();
    const { getCommentsForPost } = usePostsActions()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleShowComments = async () => {
        if (!showComments) {
            setLoading(true)
            await getCommentsForPost(post.id);
            setLoading(false)
        }
        setShowComments(!showComments);
    };

    return (
        <Container aditionalStyle="border-2 border-gray-300 bg-gray-50 rounded-lg overflow-hidden shadow-lg mb-6 transform transition duration-500 hover:shadow-xl hover:scale-105">
            <div className="p-4">
                <div className="absolute top-4 right-4 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center" onClick={() => { navigate(`/post/${post.id}`) }}>
                    <ChevronForwardOutline
                        color={'#7ec4e2'}
                        height="20px"
                        width="20px"
                    />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                <p className="text-gray-600">Posted by: <span className="font-medium text-gray-800">{user.username}</span></p>
            </div>
            <div className="px-4 py-3 bg-gray-200 border-t border-gray-300">
                <button
                    onClick={handleShowComments}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
                {loading && <p className="text-gray-500 mt-2 animate-pulse">Loading comments...</p>}
            </div>
            {showComments && commentsByPostId[post.id] && (
                <div className="p-4 bg-white">
                    <h3 className="font-semibold mb-2 text-gray-800">Comments:</h3>
                    {commentsByPostId[post.id].map(({ id, name, body, email }) => (
                        <CommentItem
                            key={id}
                            name={name}
                            body={body}
                            email={email}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default withMessage(PostItem);

