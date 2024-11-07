import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainRoutes from "../components/MainRoutes";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <Router>
      <Header />
      <Navbar username={username} avatarUrl={avatarUrl} />
      <MainRoutes
        username={username}
        setUsername={setUsername}
        setAvatarUrl={setAvatarUrl}
      />
    </Router>
  );
}

export default App;
