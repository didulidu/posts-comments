import React from 'react';
import withMessage from './withMessage';

type NavigationIconProps = {
    IconComponent: React.ComponentType<{ color: string, height: string, width: string }>;
    onClick: () => void;
};

const GoToPostButton: React.FC<NavigationIconProps> = ({ IconComponent, onClick }) => {
    return (
        <button className="absolute top-4 right-4 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
            onClick={onClick}>
            <IconComponent color="#7ec4e2" height="20px" width="20px" />
        </button>
    );
};

export default withMessage(GoToPostButton);
