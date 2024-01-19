import React, { ComponentType, useEffect } from 'react';
import { useMessage } from './MessageContext';

const withMessage = (Component: ComponentType<any>) => {
    return function Foo(props: any) {
        const message = useMessage();
        const componentName = Component.name;
        useEffect(() => {
            console.log(`${message} ${componentName}`);
        }, [componentName, message]);

        return <Component {...props} message={message} />;
    };
};

export default withMessage;