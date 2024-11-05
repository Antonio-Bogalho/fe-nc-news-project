import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleArticlePage from "./SingleArticlePage";

export default function MainRoutes(){

    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/articles/:article_id" element={<SingleArticlePage/>} />
            </Routes>
        </Router>
    )
}