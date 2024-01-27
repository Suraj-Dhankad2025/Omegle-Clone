// Chat.tsx
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
interface Message {
  id: string;
  message: string;
}

interface ChatProps {
  username: string;
}

const socket: Socket = io('http://localhost:3000');

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('chat-message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat-message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div>
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }} className='bg-slate-200'>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.id}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div className="flex ml-[5%] mt-5" style={{ backgroundImage: 'url("/bg-join.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100px', width: '350px' }}>
        <div className="flex items-center relative rounded-md overflow-hidden p-10" >
          <input
            className="bg-gray-100 text-center p-1 rounded-sm border-black border-[1px]"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button className="font-bold text-white bg-[#2474F9] ml-1 px-6 p-1 rounded-sm" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
