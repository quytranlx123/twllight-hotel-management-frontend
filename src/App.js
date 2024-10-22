import React from "react";
// components
import Layout from "./components/Layout";
import { CustomerProvider } from "./context/CustomerContext";

// pages
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { Dashboard } from "./pages/Dashboard";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import VerifyOTPForm from "./components/VerifyOtpPassword";
//test
import CustomerDashBoard from "./pages/CustomerDashBoard";

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
    element: <Register />,
  },
  {
    path: "/user",
    element: <UserProfile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/customerdashboard",
    element: <CustomerDashBoard />,
  },
  {
    path: "/forgot",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTPForm />,
  },
]);

const App = () => {
  return (
    <div>
      <CustomerProvider>
        <RouterProvider router={router} />
      </CustomerProvider>
    </div>
  );
};

export default App;
