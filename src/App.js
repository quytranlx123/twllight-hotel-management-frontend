import React from "react";
// components
import Layout from "./components/Layout";
import { AuthProvider } from './context/AuthContext';

// pages
import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Management from "./pages/Management";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

//test


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "room/:id",
        element: <RoomDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/user",
    element: <UserProfile />
  },
  {
    path: "/management",
    element: <Management />
  }
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
