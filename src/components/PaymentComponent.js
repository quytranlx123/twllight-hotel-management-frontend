import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Trạng thái lưu phương thức thanh toán đã chọn

  const handlePaypalPayment = async () => {
    setSelectedPaymentMethod('paypal'); // Đánh dấu phương thức thanh toán PayPal đã chọn
    try {
      const response = await axios.post('http://localhost:8000/api/paypal_payment/', {
        // Dữ liệu cần thiết cho yêu cầu API
      });
      console.log('PayPal payment response:', response.data);
      // Xử lý phản hồi từ API
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
    }
  };

  const handleCheckinPayment = async () => {
    setSelectedPaymentMethod('checkin'); // Đánh dấu phương thức thanh toán khi check-in đã chọn
    try {
      const response = await axios.post('http://localhost:8000/api/checkin_payment/', {
        // Dữ liệu cần thiết cho yêu cầu API
      });
      console.log('Check-in payment response:', response.data);
      // Xử lý phản hồi từ API
    } catch (error) {
      console.error('Error processing check-in payment:', error);
    }
  };

  return (
    <div className="flex justify-around mt-4">
      <button
        onClick={handlePaypalPayment}
        className={`px-4 py-2 rounded ${
          selectedPaymentMethod === 'paypal' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
        } hover:bg-blue-600`}
      >
        Thanh toán qua PayPal
      </button>
      <button
        onClick={handleCheckinPayment}
        className={`px-4 py-2 rounded ${
          selectedPaymentMethod === 'checkin' ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
        } hover:bg-green-600`}
      >
        Thanh toán khi check-in
      </button>
    </div>
  );
};

export default PaymentComponent;
