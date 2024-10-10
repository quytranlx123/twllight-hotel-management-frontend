// auth.js
export const login = async (username, password, navigate) => {
    const response = await fetch("http://localhost:8000/api/users/login/", {
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
      return { success: true };
    } else {
      // Xử lý lỗi (ví dụ: hiển thị thông báo)
      const errorData = await response.json();
      return { success: false, message: errorData.detail || "Đăng nhập không thành công." };
    }
  };
  