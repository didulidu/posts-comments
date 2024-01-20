import React, { FC } from 'react'
import { ApertureOutline } from 'react-ionicons'
import withMessage from './withMessage'

type LoaderProps = {
    label?: string
}

const Loader: FC<LoaderProps> = ({ label }) => {

    return (<div className='w-full h-screen flex justify-center items-center'>
        <div className='mx-2'>{label}</div>
        <ApertureOutline
            color={'#00000'}
            rotate
            height="50px"
            width="50px"
        />
    </div>)
}

export default withMessage(Loader);