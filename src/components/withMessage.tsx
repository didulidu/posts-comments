import React, { ComponentType } from 'react';
import { useMessage } from '../context/MessageContext';

const withMessage = (Component: ComponentType<any>) => {
    const HOCComponent = (props: any) => {
        const message = useMessage()
        return <Component {...props} logMessage={message} />
    };

    return HOCComponent
};

export default withMessage;
