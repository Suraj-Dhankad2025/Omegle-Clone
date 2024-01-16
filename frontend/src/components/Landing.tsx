import { useState,useEffect,useRef } from "react"
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
        <div className=" flex items-center bg-[#1A1E39]  rounded-md p-1 space-x-4  ">
          <div>
          <video className="rounded-md border-gray-200 border-2 bg  w-[30rem] h-[22.59rem]" autoPlay ref={videoRef}></video>
          </div>
          <div className=' chatbg h-[22.59rem]    flex justify-center items-center px-2 rounded-md border-black  border-[px]'>
            <div className="    rounded-md">
 
              <div className=" flex justify-center items-center">
              <input className=" bg-gray-100 text-center p-1 rounded-sm border-black border-[1px]" type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
              <button className=" font-bold text-white bg-[#2474F9] ml-1 px-6 p-1 rounded-sm" onClick={()=>{
              setJoined(true);
            }}>Join</button>
            </div>
            </div>
            </div>
      
        </div>
        )
    }
    return (
        <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
    )
}
