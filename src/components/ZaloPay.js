import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ZaloPay({ formData }) {
  const navigate = useNavigate(); // Corrected the useNavigate hook
  
  const handleZaloPay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payments/zalopay_create_order/",
        {
          amount: parseFloat(formData.stay_price), // Ensure formData.stay_price is correctly parsed
        }
      );
      const data = response.data
      window.location.href = data.order_url;

      
      // Redirect or perform other actions if needed
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleZaloPay}>Thanh toán ZaloPay</button>
    </div>
  );
}

export default ZaloPay;
