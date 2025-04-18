import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  // check if user is authenticated
  return false; // false for testing purposes. if you want to see other pages, change it to true
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;