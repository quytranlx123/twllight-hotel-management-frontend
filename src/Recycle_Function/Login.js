// auth.js
import backendUrl from '../config';

export const login = async (username, password, navigate) => {
  try {
    const response = await fetch(`${backendUrl}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Nếu phản hồi không hợp lệ, kiểm tra lỗi
      const errorData = await response.json();
      return { success: false, message: errorData.detail || "Đăng nhập không thành công." };
    }

    const data = await response.json();
    
    // Lưu thông tin cần thiết vào localStorage
    localStorage.setItem("role", data.role);
    localStorage.setItem("access_token", data.access); // Lưu token access nếu cần
    localStorage.setItem("refresh_token", data.refresh); // Lưu token refresh nếu có
    
    // Điều hướng đến trang chính ngay sau khi đăng nhập thành công
    navigate("/"); 
    return { success: true };

  } catch (error) {
    // Xử lý lỗi kết nối hoặc lỗi không lường trước
    console.error("Error during login:", error);
    return { success: false, message: "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại." };
  }
};