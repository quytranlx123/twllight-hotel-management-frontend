import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [otp, setOtp] = useState(""); // Nhập mã OTP
  const [isOTPSent, setIsOTPSent] = useState(false); // Biến kiểm tra trạng thái gửi OTP
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Xử lý sự kiện đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa thông báo lỗi trước đó

    // Kiểm tra sự khớp giữa mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // Chỉ gửi phone_number trong yêu cầu đăng ký
    const registerData = {
      phone_number: phoneNumber,
    };

    try {
      // Gửi yêu cầu đăng ký
      const response = await fetch(
        "http://localhost:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData), // Chỉ gửi phone_number
        }
      );

      if (response.ok) {
        // Sau khi gửi OTP thành công
        setIsOTPSent(true); // Hiển thị form OTP
        setError("");
        setSuccessMessage("Đăng ký thành công, mã OTP đã được gửi!");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Đăng ký không thành công. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    }
  };

  // Xác thực OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      // Gửi toàn bộ dữ liệu đăng ký cùng với OTP để xác thực
      const verifyResponse = await fetch(
        "http://localhost:8000/api/users/verify-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber, // Gửi số điện thoại
            otp: otp, // Gửi mã OTP
            username: username, // Gửi tên người dùng
            email: email, // Gửi email
            password: password, // Gửi mật khẩu
            role: "customer", // Gửi vai trò
          }), // Gửi toàn bộ dữ liệu đăng ký ở đây
        }
      );
      if (verifyResponse.ok) {
        alert("Xác thực OTP thành công! Vui lòng đăng nhập.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError("Mã OTP không đúng. Vui lòng thử lại.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Hiển thị form đăng ký nếu OTP chưa được gửi */}
      {!isOTPSent ? (
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
          <h1 className="text-4xl font-bold text-center mb-5">Đăng ký</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            <div className="relative py-3">
              <input
                type="text"
                className="block w-72 pb-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
                Tên người dùng
              </label>
            </div>
            <div className="relative py-3">
              <input
                type="email"
                className="block w-72 pb-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
                Email
              </label>
            </div>
            <div className="relative py-3">
              <input
                type="tel"
                className="block w-72 pb-2  px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=" "
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
                Số điện thoại
              </label>
            </div>
            <div className="relative py-3">
              <input
                type="password"
                className="block w-72 pb-2  px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
                Mật khẩu
              </label>
            </div>
            <div className="relative py-3">
              <input
                type="password"
                className="block w-72 pb-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=" "
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="absolute text-sm duration-300 transform text-transparent -top-2 left-0 -z-10 origin-[0] scale-90 transition-all peer-focus:-translate-y-1 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400">
                Xác nhận mật khẩu
              </label>
            </div>
            <div className="flex items-center justify-center mt-2">
              <button className=" w-1/2 h-10 justify-center items-center bg-blue-700 hover:bg-blue-800 text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                Đăng ký
              </button>
            </div>
            <p className="flex items-center justify-center mt-5 text-base">
              Trở lại trang 
              <a className="text-base  hover:text-blue-300" href="/login">
                 {" "}Đăng nhập
              </a>
            </p>
          </form>
        </div>
      ) : (
        // Hiển thị form OTP nếu OTP đã được gửi
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
          <h1 className="text-4xl font-bold text-center mb-5">Xác thực OTP</h1>
          <form onSubmit={verifyOTP}>
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
                Nhập mã OTP
              </label>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className=" flex items-center justify-center">
              <button className=" bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                Xác thực
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
