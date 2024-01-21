import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface Message {
  username: string;
  text: string;
}

interface ChatProps {
  username: string;
  socket: Socket | null;
}

const Chat: React.FC<ChatProps> = ({ username, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', handleIncomingMessage);

    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return;

    const message: Message = { username, text: newMessage };
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <div >
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }} className='bg-slate-200'>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex ml-[5%] mt-5" style={{ backgroundImage: 'url("/bg-join.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100px', width: '350px' }}>
        <div className="flex items-center relative rounded-md overflow-hidden p-10" >
          <input
            className="bg-gray-100 text-center p-1 rounded-sm border-black border-[1px]"
            type="text"
            value={newMessage}
            onChange={handleInputChange}
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
