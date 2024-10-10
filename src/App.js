import React from "react";
// components
import Layout from "./components/Layout";
import { AuthProvider } from './context/AuthContext';

// pages
import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { Dashboard } from "./pages/Dashboard";
//test
import PaymentSuccess from "./pages/PaymentSuccess";

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
    path: "/dashboard",
    element: <Dashboard />
  }
  ,
  {
    path: "/payment-success",
    element: <PaymentSuccess />
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
