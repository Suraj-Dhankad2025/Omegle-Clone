import { useState,useEffect,useRef } from "react"
import { Link } from "react-router-dom";
import { Room } from "./Room";
export const Landing = () => {
    const [name, setName] = useState('');
    const [joined, setJoined] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [localAudioTrack, setlocalAudioTrack] = useState<MediaStreamTrack | null>(null);

    const getCam = async () => {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];
      setlocalVideoTrack(videoTrack);
      setlocalAudioTrack(audioTrack);
      if(!videoRef.current) return;
      videoRef.current.srcObject = new MediaStream([videoTrack, audioTrack]);
      videoRef.current.play();
    }

    useEffect(() => {
      if(videoRef && videoRef.current) {
        getCam();
      }
    }, [videoRef]);

    if(!joined){
      return (
        <div>
          <video autoPlay ref={videoRef}></video>
          <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
    
          <Link to={`/room?name=${name}`}>
            <button onClick={()=>{}}>Join</button>
          </Link>
        </div>
        )
    }
    return (
        <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
    )
}

