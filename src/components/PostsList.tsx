import React, { FC } from 'react'
import { Post } from '../types/Post'
import PostItem from './PostItem'
import { usePosts } from '../context/PostsContext'
import withMessage from './withMessage'
interface PostsListProps {
    posts: Post[]
}
const PostsList: FC<PostsListProps> = ({ posts }) => {
    const { usersMap } = usePosts()

    return <div className="space-y-8">
        {posts?.map((post) => (
            <div key={post.id}>
                <PostItem user={usersMap[post?.userId]} post={post} />
            </div>
        ))}
    </div>
}

export default withMessage(PostsList)