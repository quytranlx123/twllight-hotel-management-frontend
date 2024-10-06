import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role: "customer" }),
    });

    // Kiểm tra phản hồi từ server
    if (response.ok) {
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      navigate("/login");
    } else {
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  };

  return (
    <div>
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-5">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="text"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Username
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="email"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Your Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full mb-4 mt-6 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="w-full mb-4 mt-6 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Move to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
