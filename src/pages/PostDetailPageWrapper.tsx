import React, { FC, Suspense } from "react"
import { useParams } from "react-router-dom"
import PostDetailPage from "./PostDetailPage"
import wrapPromise from "../utils/wrapPromise"
import { fetchPostById } from "../services/postService"
import { fetchCommentsByPost } from "../services/commentService"
import Loader from "../components/Loader"

const PostDetailPageWrapper: FC = () => {
    const { id } = useParams()
    const postResource = wrapPromise(fetchPostById(Number(id)))
    const commentResource = wrapPromise(fetchCommentsByPost(Number(id)))

    return (
        <Suspense fallback={<Loader label="Loading post..." />} >
            <PostDetailPage postResource={postResource} commentResource={commentResource} />
        </Suspense>
    );
}

export default PostDetailPageWrapper