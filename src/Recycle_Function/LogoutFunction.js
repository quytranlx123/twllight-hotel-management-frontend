// useLogout.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const useLogout = () => {
  const [isOpen, setIsOpen] = useState(true); // State để quản lý việc mở menu
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const logoutAndClearData = () => {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    localStorage.clear();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        logoutAndClearData();
        setIsOpen(false); // Đóng menu khi đăng xuất thành công
        navigate("/"); // Chuyển hướng về trang chính
      } else {
        console.error("Đăng xuất không thành công");
        alert("Đăng xuất không thành công, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return {
    handleLogout,
    isOpen,
    setIsOpen,
  };
};

export default useLogout;
