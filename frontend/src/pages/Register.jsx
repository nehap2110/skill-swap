import { useState } from "react";
import { API } from "../services/api";

export default function Register() {
  const [data, setData] = useState({});

  const register = async () => {
    await API.post("/auth/register", data);
    alert("Registered!");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setData({...data, name:e.target.value})} />
      <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})} />
      <input type="password" onChange={e => setData({...data, password:e.target.value})} />
      <button onClick={register}>Register</button>
    </div>
  );
}