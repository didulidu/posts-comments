import React, { FC, ReactNode, createContext, useContext } from 'react';

const MessageContext = createContext<string>('');

export const useMessage = () => useContext(MessageContext);

export const MessageProvider: FC<{ message: string, children: ReactNode }> = ({ message, children }) => (
    <MessageContext.Provider value={message}>{children}</MessageContext.Provider>
);
