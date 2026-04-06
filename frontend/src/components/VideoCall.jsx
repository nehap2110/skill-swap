import { useEffect, useRef } from "react";
import { socket } from "../services/socket";

export default function VideoCall({ to }) {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => videoRef.current.srcObject = stream);
  }, []);

  return <video ref={videoRef} autoPlay />;
}