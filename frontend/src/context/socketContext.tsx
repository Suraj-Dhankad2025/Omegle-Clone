import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  children: React.ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const socket = io('http://localhost:3000'); // Adjust the URL accordingly

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): Socket | null => {
  const socket = useContext(SocketContext);
  return socket;
};

export { SocketProvider, useSocket };
