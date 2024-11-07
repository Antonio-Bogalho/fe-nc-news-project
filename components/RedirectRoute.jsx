import { Navigate } from "react-router-dom";

export default function RedirectRoute({ username, children }) {
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
