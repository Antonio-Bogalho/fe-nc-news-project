import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUsername }) {
  const [inputUsername, setInputUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsernames = [
      "tickle122",
      "grumpy19",
      "happyamy2016",
      "cooljmessy",
      "weegembump",
      "jessjelly",
    ];
    if (validUsernames.includes(inputUsername)) {
      setUsername(inputUsername);
      navigate("/");
    } else {
      setErrorMessage("Username does not exist!");
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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
