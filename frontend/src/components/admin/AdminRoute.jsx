import { Navigate } from "react-router-dom";
import LoadingState from "../common/LoadingState.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState label="Checking admin session..." />;
  }

  return user ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
