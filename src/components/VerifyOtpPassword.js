import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {verifyOTP} from "../Recycle_Function/ForgotPassword"; // Hàm gọi API xác nhận OTP

const VerifyOTPForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {}; // Lấy số điện thoại từ state
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyOTP(phoneNumber, otp, newPassword);

    if (result.success) {
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu thành công
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-5">Xác Nhận OTP</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="text"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Mã OTP
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Mật khẩu mới
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
