import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("role", data.role);
      navigate("/"); // Điều hướng đến trang chính ngay sau khi đăng nhập thành công
    } else {
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
      const errorData = await response.json();
      setError(errorData.detail || "Đăng nhập không thành công.");
    }
  };

  return (
    <div>
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-5">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
            Login
          </button>
          <button
            type="button" // Thay đổi từ "onClick" thành "type='button'" để tránh gửi form
            onClick={handleRegister}
            className="w-full mb-4 mt-6 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Move to register
          </button>
          <a href="http://127.0.0.1:8000/accounts/login/">
            Đăng nhập với tư cách quản trị viên
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
