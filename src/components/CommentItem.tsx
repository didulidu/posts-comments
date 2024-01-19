import React, { FC } from 'react'
import { Comment } from '../types/Comment'
import Container from './Container';

type CommentProps = {
    name: Comment['name'];
    body: Comment['body'];
    email: Comment['email']
}

const CommentItem: FC<CommentProps> = ({ name, body, email }) => {
    return (
        <Container>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="mt-2 text-gray-700">{body}</p>
        </Container>
    )
}

export default CommentItem