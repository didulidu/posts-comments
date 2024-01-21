import React, { FC } from 'react'
import withMessage from './withMessage'
import withLogger from './withLogger'

type HeaderProps = {
    title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
    return <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">{title}</h1>
}

export default withMessage(withLogger(Header));