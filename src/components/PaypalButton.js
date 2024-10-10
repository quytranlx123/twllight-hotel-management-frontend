import React, { useState } from "react";
import axios from "axios";

const PayPalPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPayment = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/paypal/create-payment/",
        {
          itemName: "Iphone 4S",
          price: 25.0,
        }
      );

      const redirectUrl = response.data.redirect_url; // Lấy URL chuyển hướng
      if (redirectUrl) {
        window.location.href = redirectUrl; // Chuyển hướng đến trang phê duyệt của PayPal
      } else {
        throw new Error("Không tìm thấy URL chuyển hướng trong phản hồi");
      }
    } catch (err) {
      console.error("Lỗi khi tạo thanh toán:", err);
      setError("Đã xảy ra lỗi khi tạo thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Thanh toán với PayPal</h1>
      <button onClick={createPayment} disabled={loading}>
        {loading ? "Đang xử lý..." : "Thanh toán với PayPal"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PayPalPayment;
