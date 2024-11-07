import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ username, avatarUrl }) {
  const [showTopics, setShowTopics] = useState(false);

  const toggleTopics = () => {
    setShowTopics(!showTopics);
  };

  return (
    <ul className="nav-links">
      {!username ? (
        <li></li>
      ) : (
        <li>
          <span>Welcome {username}! </span>
          {avatarUrl && (
            <img src={avatarUrl} alt="User Avatar" width="50" height="30" />
          )}
        </li>
      )}
      {!username ? (
        <li></li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      {username ? (
        <li className="center">
          <Link to="/">Home</Link>
        </li>
      ) : (
        <li></li>
      )}
      {username ? (
        <li className="upward">
          <button onClick={toggleTopics}>Topics</button>
          {showTopics && (
            <ul>
              <li>
                <Link to="/topics/coding">Coding</Link>
              </li>
              <li>
                <Link to="/topics/cooking">Cooking</Link>
              </li>
              <li>
                <Link to="/topics/football">Football</Link>
              </li>
            </ul>
          )}
        </li>
      ) : (
        <li></li>
      )}
    </ul>
  );
}
