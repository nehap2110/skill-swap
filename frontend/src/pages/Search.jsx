import { useEffect, useState } from "react";
import { API } from "../services/api";
import UserCard from "../components/UserCard";

export default function Search() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data.users));
  }, []);

  return users.map(u => <UserCard key={u._id} user={u} />);
}