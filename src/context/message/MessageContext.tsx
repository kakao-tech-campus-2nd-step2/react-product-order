import React, { createContext, useContext } from 'react';

type MessageContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContextValue: MessageContextType = {
  message: '',
  setMessage: () => {},
};

export const MessageContext = createContext<MessageContextType>(defaultContextValue);

export const useMessage = () => useContext(MessageContext);
