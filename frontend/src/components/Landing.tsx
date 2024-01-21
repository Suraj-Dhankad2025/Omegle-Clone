import { useState, useEffect, useRef } from "react"
import { Room } from "./Room";
import Footer from "./Footer";
import { Home } from "./Home";
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
    if (!videoRef.current) return;
    videoRef.current.srcObject = new MediaStream([videoTrack, audioTrack]);
    videoRef.current.play();
  }

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  if (!joined) {
    return (
      <div className='h-[115vh]  bg-[#040A20]'>
        <div className='p-8 flex flex-col'>
          <div className='bg-gray-300 rounded-lg p-8 mb-8'>
            <Home />
          </div>
          <div className="flex-grow">
            <h1 className='mt-[1rem] text-white text-center font-bold text-xl'>Welcome to Live chat! </h1>
            <p className='text-white text-center mt-1'>To get started, please enter your name.</p>
            <div>
              <div className="mt-[2rem]">
                <video className="rounded-md border-gray-200 border-2 bg w-[30rem] h-[22.59rem]" autoPlay ref={videoRef}></video>
              </div>
              <div className="flex ml-[5%] mt-5" style={{ backgroundImage: 'url("/bg-join.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100px', width: '350px' }}>
                <div className="flex items-center relative rounded-md overflow-hidden p-10" >
                  <input className="bg-gray-100 text-center p-1 rounded-sm border-black border-[1px]" type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                  <button className="font-bold text-white bg-[#2474F9] ml-1 px-6 p-1 rounded-sm" onClick={() => { setJoined(true) }}>Join</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
        <div className="-mb-10">
        <Footer/>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
    </div>
  )
}

