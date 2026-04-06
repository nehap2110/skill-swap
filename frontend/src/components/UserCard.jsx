import { API } from "../services/api";

export default function UserCard({ user }) {
  const sendRequest = async () => {
    await API.post("/swaps", {
      receiver: user._id,
      skillOffered: "React",
      skillRequested: "DSA"
    });
    alert("Request Sent");
  };

  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={sendRequest}>Swap</button>
    </div>
  );
}