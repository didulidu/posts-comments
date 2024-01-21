import React, { useParams } from "react-router-dom"
import { usePosts } from "../context/PostsContext"
import { useEffect } from "react"
import CommentItem from "../components/CommentItem"
import Loader from "../components/Loader"
import Header from "../components/Header"
import usePostsActions from "../hooks/usePostsActions"
import withMessage from "../components/withMessage"
import withLogger from "../components/withLogger"

const PostDetailPage = () => {
    const { getPostWithComments } = usePostsActions()
    const { commentsByPostId, currentPost: post } = usePosts()
    const { id } = useParams()

    const postId = Number(id)
    useEffect(() => {
        getPostWithComments(postId)
    }, [])

    if (!post || !commentsByPostId[postId]?.length) {
        return <Loader label="Loading post..." />
    }

    return (
        <div className="mx-auto p-4 font-sans">
            <Header title={post.title} />
            <p className="mb-8 text-lg text-gray-700">{post.body}</p>
            <div className="comments">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>
                {commentsByPostId[postId].length > 0 ? (
                    commentsByPostId[postId].map(({ id, name, body, email }) => (
                        <CommentItem
                            key={id}
                            name={name}
                            body={body}
                            email={email}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">No comments yet.</p>
                )}
            </div>
        </div >
    );
}

export default withMessage(withLogger(PostDetailPage));