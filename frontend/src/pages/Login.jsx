import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e => setData({...data, email:e.target.value})} />
      <input type="password" onChange={e => setData({...data, password:e.target.value})} />
      <button onClick={login}>Login</button>
    </div>
  );
}