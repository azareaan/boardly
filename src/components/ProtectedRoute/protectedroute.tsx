import { Navigate, Outlet } from "react-router-dom";
import { UserData, UserState } from "../../types/type";

const user1:UserData = { name: "John Doe",email: "abc@gmail.com",pass: "123456", role: "admin" }
const user2:UserData = { name: "Ali",email: "ali@gmail.com",pass: "123456", role: "admin" }

const users:UserState = { users: [user1, user2] }

localStorage.setItem("users", JSON.stringify([users]));
localStorage.setItem("auth", "true");

const isAuthenticated = () => {
  if (localStorage.getItem("auth") === "true") {
    return true;
  }
  return false;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;