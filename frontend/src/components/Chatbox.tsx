import React from 'react';
import Chat from './Chat';
import { Socket } from 'socket.io-client';

interface Props {
    username: string;
    socket: Socket | null;
}
export const Chatbox: React.FC<Props> = ({ username, socket }) => {
    return (
        <div>
          <h1>Chat Box</h1>
          <Chat socket={socket} username={username} />
        </div>   
    )
}