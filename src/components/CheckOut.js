import React, { useState } from "react";
//datepicker
import DatePicker from "react-datepicker";
//datepicker css
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
//icons
import { BsCalendar } from "react-icons/bs";

const CheckOut = ({ onDateChange }) => {
  // Khởi tạo state cho ngày check-out
  const [endDate, setEndDate] = useState(null);

  // Hàm xử lý khi ngày được chọn
  const handleChange = (endDate) => {
    setEndDate(endDate);  // Cập nhật state với ngày được chọn
    onDateChange(endDate);   // Truyền giá trị ngày lên component cha
  };

  return (
    <div className="relative flex items-center justify-end h-full">
      {/* Icon lịch */}
      <div className="absolute z-10 pr-8">
        <BsCalendar className="text-accent text-base" />
      </div>
      
      {/* Component DatePicker */}
      <DatePicker
        className="w-full h-full"  // Thêm khoảng cách để tránh chữ đè lên icon
        selected={endDate}              // Ngày đã chọn
        placeholderText="Check-out"  // Văn bản placeholder
        onChange={handleChange}           // Hàm xử lý khi ngày thay đổi
        minDate={new Date()}           // Giới hạn chỉ cho phép chọn ngày hiện tại và tương lai
        dateFormat="dd/MM/yyyy"           // Định dạng hiển thị ngày
        aria-label="Check-out"        // Nhãn truy cập cho người dùng công cụ hỗ trợ
      />
    </div>
  );
};

export default CheckOut;
