import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleArticlePage from "./SingleArticlePage";
import LoginPage from "./LoginPage";
import TopicsPage from "./TopicsPage";
import RedirectRoute from "./RedirectRoute";
import PathNotFound from "./PathNotFound";

export default function MainRoutes({ username, setUsername, setAvatarUrl }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage setUsername={setUsername} setAvatarUrl={setAvatarUrl} />
        }
      />
      <Route
        path="/"
        element={
          <RedirectRoute username={username}>
            <HomePage />
          </RedirectRoute>
        }
      />
      <Route
        path="/articles/:article_id"
        element={
          <RedirectRoute username={username}>
            <SingleArticlePage username={username} />
          </RedirectRoute>
        }
      />
      <Route
        path="/topics/:topic"
        element={
          <RedirectRoute username={username}>
            <TopicsPage username={username} />
          </RedirectRoute>
        }
      />
      <Route path="*" element={<PathNotFound/>} />
    </Routes>
  );
}
