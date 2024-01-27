import { useEffect, useState } from "react";
import { useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import Footer from "./Footer";
import { Chatbox } from "./Chatbox";

const URL = "http://localhost:3000";

export const Room = ({
    name,
    localAudioTrack,
    localVideoTrack
}: {
    name: string,
    localAudioTrack: MediaStreamTrack | null,
    localVideoTrack: MediaStreamTrack | null,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [lobby, setLobby] = useState(true);
    const [socket, setSocket] = useState<null | Socket>(null);
    const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
    const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>();
    const remoteVideoRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        const socket = io(URL);
        socket.on('send-offer', async ({ roomId }) => {
            setLobby(false);
            const pc = new RTCPeerConnection();

            setSendingPc(pc);
            if (localVideoTrack) {
                console.error("added tack");
                console.log(localVideoTrack)
                pc.addTrack(localVideoTrack)
            }
            if (localAudioTrack) {
                console.log(localAudioTrack)
                pc.addTrack(localAudioTrack)
            }

            pc.onicecandidate = async (e) => {
                if (e.candidate) {
                    socket.emit("add-ice-candidate", {
                        candidate: e.candidate,
                        type: "sender",
                        roomId
                    })
                }
            }
            pc.onnegotiationneeded = async () => {
                const sdp = await pc.createOffer();
                //@ts-ignore
                pc.setLocalDescription(sdp)
                socket.emit("offer", {
                    sdp,
                    roomId
                })
            }
        });
        socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
            setLobby(false);
            const pc = new RTCPeerConnection();
            pc.setRemoteDescription(remoteSdp)
            const sdp = await pc.createAnswer();
            //@ts-ignore
            pc.setLocalDescription(sdp)
            const stream = new MediaStream();
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }

            setRemoteMediaStream(stream);
            // trickle ice 
            setReceivingPc(pc);
            window.pcr = pc;

            pc.onicecandidate = async (e) => {
                if (!e.candidate) {
                    return;
                }
                if (e.candidate) {
                    socket.emit("add-ice-candidate", {
                        candidate: e.candidate,
                        type: "receiver",
                        roomId
                    })
                }
            }

            socket.emit("answer", {
                roomId,
                sdp: sdp
            });
            setTimeout(() => {
                const track1 = pc.getTransceivers()[0].receiver.track
                const track2 = pc.getTransceivers()[1].receiver.track
                if (track1.kind === "video") {
                    setRemoteAudioTrack(track2)
                    setRemoteVideoTrack(track1)
                } else {
                    setRemoteAudioTrack(track1)
                    setRemoteVideoTrack(track2)
                }
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track1)
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track2)
                //@ts-ignore
                remoteVideoRef.current.play();
            }, 5000)
        });

        socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
            setLobby(false);
            setSendingPc(pc => {
                pc?.setRemoteDescription(remoteSdp)
                return pc;
            });
        })

        socket.on("lobby", () => {
            setLobby(true);
        })

        socket.on("add-ice-candidate", ({ candidate, type }) => {
            if (type == "sender") {
                setReceivingPc(pc => {
                    pc?.addIceCandidate(candidate)
                    return pc;
                });
            } else {
                setSendingPc(pc => {
                    pc?.addIceCandidate(candidate)
                    return pc;
                });
            }
        })

        setSocket(socket)
    }, [name])

    useEffect(() => {
        if (localVideoRef.current) {
            if (localVideoTrack) {
                localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
                localVideoRef.current.play();
            }
        }
    }, [localVideoRef]);

    // document.addEventListener('keydown', function(event) {
    //     if (event.key === 'Escape') {
            
    //         console.log('Escape key pressed!');
    //     }
    // });
    const handleSubmit = (e:any) => {
        e.preventDefault();
        
    }
    

    return (
        <>
            <div className="h-[105vh] flex flex-row pl-8 pt-2  bg-slate-800">
                <div className=" flex flex-col backdrop-blur-md">
                    <div className="mb-4 flex flex-col items-start">
                        <div className="mb-2">
                            <video className="rounded-md border-gray-200 border-2 bg w-[30rem] h-[22.59rem]" autoPlay width={400} height={400} ref={remoteVideoRef} />
                        </div>
                        <div className="bg-slate-200 w-[480px] text-center">
                            <h1 className="text-lg">{lobby ? "Waiting to connect you to someone!" : "Stranger"}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="mb-2">
                            <video className="rounded-md border-gray-200 border-2 bg w-[30rem] h-[22.59rem]" autoPlay width={400} height={400} ref={localVideoRef} />
                        </div>
                        <div className="bg-slate-200 w-[480px] text-center">
                            <h1 className="text-lg">Hello! {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <Chatbox username={name}/>
                </div>
            </div>
            <button className="bg-slate-900 px-4 py-2 rounded-md text-white" onClick={handleSubmit}>Leave</button>
            <Footer />
        </>

    )
}