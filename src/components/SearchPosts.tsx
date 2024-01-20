import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce';
import withMessage from './withMessage'

interface SearchPostsProps {
    onChange: (search: string) => void
}

const SearchPosts: FC<SearchPostsProps> = ({ onChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);


    useEffect(() => {
        onChange(debouncedSearchQuery)
    }, [debouncedSearchQuery]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <input
            type="text"
            placeholder='Search by username'
            onChange={handleChange}
            className='mb-6 w-full px-4 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out'
        />
    )
}

export default withMessage(SearchPosts)