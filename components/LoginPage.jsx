import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../utils/api";

export default function LoginPage({ setUsername, setAvatarUrl }) {
  const [inputUsername, setInputUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }

  const handleLogin = () => {
    const user = users.find((user) => user.username === inputUsername);
    if (user) {
      setUsername(user.username);
      setAvatarUrl(user.avatar_url);
      navigate("/");
    } else {
      setAvatarUrl("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
