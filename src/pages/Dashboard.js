// Dashboard.js
import { Sidebar } from "../components/Sidebar";
import { MainContentDashBoard } from "../components/MainContentDashBoard";
import React, { useState } from "react";
import { BookingProvider } from "../context/BookingsContext";
import { UserProvider } from "../context/UserContext";
export function Dashboard() {
  const [open, setOpen] = useState(0); // Điều khiển accordion trong sidebar
  const [selectedStatuses, setSelectedStatuses] = useState([]); // Trạng thái các mục đã chọn

  // Điều khiển mở/đóng các phần accordion
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Xử lý chọn các trạng thái trong sidebar
  const handleStatusSelect = (...statuses) => {
    setSelectedStatuses(statuses);
    console.log(statuses)
  };

  return (
    <UserProvider>
      <BookingProvider>
        <div className="flex flex-row h-screen">
          {/* Sidebar với chiều rộng cố định */}
          <div className="w-1/6 ">
            {" "}
            {/* Set fixed width */}
            <Sidebar
              open={open}
              handleOpen={handleOpen}
              onSelect={handleStatusSelect}
            />
          </div>

          {/* Nội dung chính chiếm phần còn lại */}
          <div className="flex-1">
            {/* Flex-grow to take remaining space */}
            <MainContentDashBoard open={open} statuses={selectedStatuses} />
          </div>
        </div>
      </BookingProvider>
    </UserProvider>
  );
}
