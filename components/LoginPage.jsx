import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../utils/api";

export default function LoginPage({ setUsername, setAvatarUrl }) {
  const [selectedUsername, setSelectedUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
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
    const user = users.find((user) => user.username === selectedUsername);
    if (user) {
      setUsername(user.username);
      setAvatarUrl(user.avatar_url);
      navigate("/");
    } else {
      setAvatarUrl("");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <select
        value={selectedUsername}
        onChange={(e) => setSelectedUsername(e.target.value)}
        className="login-select"
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

