import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentItem from '../components/CommentItem';

describe('CommentItem', () => {
    const mockComment = {
        name: 'John Doe',
        body: 'This is a test comment',
        email: 'john@example.com'
    };
    test('renders the comment with provided data', () => {
        render(<CommentItem {...mockComment} />);
        expect(screen.getByText(mockComment.name)).toBeInTheDocument();
        expect(screen.getByText(mockComment.body)).toBeInTheDocument();
        expect(screen.getByText(mockComment.email)).toBeInTheDocument();
    });
    test('renders within a Container component', () => {
        const { container } = render(<CommentItem {...mockComment} />);
        expect(container.firstChild).toHaveClass('comment-animate');
    });

});
