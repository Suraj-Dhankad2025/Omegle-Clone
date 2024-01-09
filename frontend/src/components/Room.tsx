import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { Socket, io } from "socket.io-client";
import { useState } from "react";

const URL = 'http://localhost:3000';
export const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  const [lobby, setLobby] = useState(true);
  const [socket, setSocket] = useState<null | Socket>(null);
  // const [connected, setConnected] = useState(false);
  useEffect(() => {
    const socket = io(URL);
    socket.on('send-offer', ({ roomId }) => {
      setLobby(false);
      socket.emit('offer', { spd: "", roomId });
    })
    socket.on('offer', ({ roomId, offer }) => {
      setLobby(false);
      socket.emit('answer', { roomId, spd:""});
    });
     
    socket.on('answer', ({ roomId, answer }) => {
      setLobby(false);
    });
    socket.on('lobby', () => {
      setLobby(true);
    });
    setSocket(socket);
  }, [name]);

  if(lobby) {
    return (
    <div>
      Waiting to connect to someone
    </div>
    );
  }
  return (
    <div>
      Hi {name}
      <video width={400} height={400}/>
      <video width={400} height={400}/>
    </div>
  )
}
