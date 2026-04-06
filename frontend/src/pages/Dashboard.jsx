import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/users/me").then(res => setUser(res.data));
  }, []);

  return user ? <h2>Welcome {user.name}</h2> : "Loading...";
}