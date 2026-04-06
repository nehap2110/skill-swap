import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";

export default function VideoRoom() {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const peerRef = useRef();

  const [stream, setStream] = useState(null);
  const [callIncoming, setCallIncoming] = useState(null);

  // 🎥 Get camera + mic
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        localVideo.current.srcObject = stream;
      });
  }, []);

  // 📥 Incoming call listener
  useEffect(() => {
    socket.on("incoming-call", ({ from, offer }) => {
      setCallIncoming({ from, offer });
    });
  }, []);

  // 📞 Start Call
  const startCall = async (to) => {
    const peer = createPeer();

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit("call-user", { to, offer });

    peerRef.current = peer;
  };

  // ✅ Accept Call
  const acceptCall = async () => {
    const peer = createPeer();

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    await peer.setRemoteDescription(callIncoming.offer);

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit("answer-call", {
      to: callIncoming.from,
      answer,
    });

    peerRef.current = peer;
  };

  // 🔗 Peer setup
  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // ❄️ ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: callIncoming?.from,
          candidate: event.candidate,
        });
      }
    };

    // 📺 Remote stream
    peer.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    return peer;
  };

  // 📥 Receive Answer
  useEffect(() => {
    socket.on("call-accepted", async ({ answer }) => {
      await peerRef.current.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerRef.current.addIceCandidate(candidate);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <div>
      <h2>Video Room</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <video ref={localVideo} autoPlay muted width="300" />
        <video ref={remoteVideo} autoPlay width="300" />
      </div>

      {/* 📞 Start Call */}
      <button onClick={() => startCall("OTHER_SOCKET_ID")}>
        Start Call
      </button>

      {/* 📥 Incoming Call */}
      {callIncoming && (
        <div>
          <p>Incoming Call...</p>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
}