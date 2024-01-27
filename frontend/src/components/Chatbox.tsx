import React from 'react';
import Chat from './Chat';
interface Props {
    username: string;
}
export const Chatbox: React.FC<Props> = ({ username }) => {
    return (
        <div>
          <h1>Chat Box</h1>
          <Chat username={username} />
        </div>   
    )
}