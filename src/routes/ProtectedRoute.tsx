import { Navigate } from "react-router-dom";
import { type ReactNode } from "react"; // Add 'type' keyword
import { useAuth } from "./useAuth";
import LoadingPage from "../components/LoadingPage";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, appUser } = useAuth();
  //return loading ? null : appUser ? children : <Navigate to="/login" />;

  if (loading) {
    return <LoadingPage />;
  }

  if (appUser) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
