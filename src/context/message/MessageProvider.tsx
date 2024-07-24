import { useState, ReactNode } from 'react';

import { MessageContext } from './MessageContext';

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>('');

  return (
    <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>
  );
};
