import React, { FC, ReactNode } from 'react'
import withMessage from '../context/withMessage'

const Container: FC<{ children: ReactNode, aditionalStyle?: string }> = ({ children, aditionalStyle }) => {
    return <div className={`comment-animate mb-6 p-4 border border-gray-300 rounded-lg shadow ${aditionalStyle}`}>
        {children}
    </div>
}

export default withMessage(Container)