import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Requests() {
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
    API.get("/swaps").then(res => setReqs(res.data));
  }, []);

  const accept = (id) => API.put(`/swaps/${id}/accept`);

  return reqs.map(r => (
    <div key={r._id}>
      {r.skillOffered} → {r.skillRequested}
      <button onClick={() => accept(r._id)}>Accept</button>
    </div>
  ));
}