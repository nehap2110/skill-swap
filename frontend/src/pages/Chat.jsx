import { useState, useEffect } from "react";
import { socket } from "../services/socket";

export default function ChatBox({ to }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", m => setMessages(prev => [...prev, m]));
  }, []);

  const send = () => {
    socket.emit("send-message", { to, message: msg });
    setMessages(prev => [...prev, msg]);
  };

  return (
    <div>
      {messages.map((m, i) => <p key={i}>{m}</p>)}
      <input onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}