import React, { FC } from 'react'
import { Comment } from '../types'
import CommentItem from './CommentItem'
import withMessage from './withMessage'
import withLogger from './withLogger'

interface CommentsListProps {
    comments: Comment[]
}

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
    return (<>
        {
            comments.map(({ id, name, body, email }) => (
                <CommentItem
                    key={id}
                    name={name}
                    body={body}
                    email={email}
                />
            ))
        }
    </>)
}

export default withMessage(withLogger(CommentsList));
