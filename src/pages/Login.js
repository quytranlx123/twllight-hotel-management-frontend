import React from "react";
// hình ảnh
import LoginForm from "../components/LoginForm";
import Img from "../assets/login/login.png";

function Login() {
  return (
    <div
      className="text-white h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${Img})` }}
    >
      <LoginForm />
    </div>
  );
}

export default Login;
