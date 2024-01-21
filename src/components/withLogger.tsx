import React, { ComponentType } from 'react';
import useLogger from '../hooks/useLogger';

const withLogger = (Component: ComponentType<any>) => {
    const HOCComponent = (props: any & { logMessage: string }) => {
        const { logMessage, ...otherProps } = props
        useLogger(logMessage, Component.name)

        return <Component {...otherProps} />;
    };

    return HOCComponent
};

export default withLogger;