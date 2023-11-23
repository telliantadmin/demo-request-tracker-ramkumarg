import Login from "./scenes/Auth/Login";
import Signup from "./scenes/Auth/Signup";
import ForgotPassword from "./scenes/Auth/ForgotPassword";
import UserDashboard from "./scenes/Home/User";
import AgentDashboard from "./scenes/Home/Agent";
import AdminDashboard from "./scenes/Home/Admin";

const routes = [
    {
      "path": "/auth/login",
      "role": "",
      "title": "Login",
      "component": Login
    },
    {
      "path": "/auth/signup",
      "role": "",
      "title": "Sign Up",
      "component": Signup
    },
    {
      "path": "/auth/forgot-password",
      "role": "",
      "title": "Forgot Password",
      "component": ForgotPassword
    },
    {
      "path": "/user",
      "role": "user",
      "title": "User Dashboard",
      "component": UserDashboard
    },
    {
      "path": "/agent",
      "role": "agent",
      "title": "Agent Dashboard",
      "component": AgentDashboard
    },
    {
      "path": "/admin",
      "role": "admin",
      "title": "Admin Dashboard",
      "component": AdminDashboard
    }
  ]
export default routes;
  