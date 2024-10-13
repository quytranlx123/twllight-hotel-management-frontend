import React, { useState } from "react";
//datepicker
import DatePicker from "react-datepicker";
//datepicker css
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
//icons
import { BsCalendar } from "react-icons/bs";

const CheckIn = ({ onDateChange }) => {
  // Khởi tạo state cho ngày check-in
  const [startDate, setStartDate] = useState(null);

  // Hàm xử lý khi ngày được chọn
  const handleChange = (startDate) => {
    setStartDate(startDate);  // Cập nhật state với ngày được chọn
    onDateChange(startDate);   // Truyền giá trị ngày lên component cha
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
        selected={startDate}              // Ngày đã chọn
        placeholderText="Check-in"  // Văn bản placeholder
        onChange={handleChange}           // Hàm xử lý khi ngày thay đổi
        minDate={new Date()}           // Giới hạn chỉ cho phép chọn ngày hiện tại và tương lai
        dateFormat="dd/MM/yyyy"           // Định dạng hiển thị ngày
        aria-label="Ngày Check-in"        // Nhãn truy cập cho người dùng công cụ hỗ trợ
      />
    </div>
  );
};

export default CheckIn;
