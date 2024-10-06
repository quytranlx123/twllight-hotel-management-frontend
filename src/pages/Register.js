import React from "react";
// hình ảnh
import LoginForm from "../components/LoginForm";
import Img from "../assets/login/login.png";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div
      className="text-white h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${Img})` }}
    >
    <RegisterForm/>
    </div>
  );
}

export default Register;
