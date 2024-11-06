import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleArticlePage from "./SingleArticlePage";
import LoginPage from "./LoginPage";
import { useState } from "react";

export default function MainRoutes(){
    const [username, setUsername] = useState("")

    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
            <Route path="/articles/:article_id" element={<SingleArticlePage username={username}/>} />
            </Routes>
        </Router>
    )
}