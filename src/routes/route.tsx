import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import Home from '../pages/Home/home';
import Project from '../pages/Project/project';
import Task from '../pages/Task/task';
import Team from '../pages/Team/team';
import Login from '../pages/Login/login';
import ProtectedRoute from '../components/ProtectedRoute/protectedroute';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: ":project",
            element: <Project />
          },
          {
            path: ":project/team",
            element: <Team />
          },
          {
            path: ":project/:task",
            element: <Task />
          }
        ]
      }
    ]
  }
]);

export default router;