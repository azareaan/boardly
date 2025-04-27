import { Navigate, Outlet } from "react-router-dom";
import { UserData, UserState } from "../../types/type";

const isAuthenticated = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
 
  if (auth.auth === "true") {
    return true;
  }
  return false;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;