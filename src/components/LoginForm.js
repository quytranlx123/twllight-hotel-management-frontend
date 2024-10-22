import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Recycle_Function/Login";
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

    const result = await login(username, password, navigate); // Đảm bảo fetchUser được truyền vào

    // Kiểm tra kết quả trả về từ hàm login
    if (!result.success) {
      setError(result.message);
    } else {
      setError(null); // Xóa thông báo lỗi nếu đăng nhập thành công
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-5">Đăng nhập</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative my-7">
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
            className="w-full mt-4 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
          <p className="pb-4 pt-1 flex justify-end">
            <a
              href="/forgot"
              className=" text-sm text-gray-200 hover:text-blue-300"
            >
              Quên mật khẩu
            </a>
          </p>
          <p className="text-center text-sm text-gray-200">
            Chưa có tài khoản?
            <a
              href="/register"
              className=" text-sm text-gray-200 hover:text-blue-300"
            >
              Đăng kí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
