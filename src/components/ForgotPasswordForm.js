import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../Recycle_Function/ForgotPassword";

const ForgotPasswordForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendOTP(phoneNumber);

    // Kiểm tra kết quả trả về từ hàm sendOTP
    if (result.success) {
      setMessage(result.message);
      setError(null);
      // Chuyển hướng đến trang nhập OTP sau khi gửi thành công
      navigate("/verify-otp", { state: { phoneNumber } });
    } else {
      setError(result.message);
      setMessage(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center mb-5">Quên Mật Khẩu</h1>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative my-7">
            <input
              type="text"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
              Số điện thoại
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Gửi OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
