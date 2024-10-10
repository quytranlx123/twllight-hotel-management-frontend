// Dashboard.js
import { Sidebar } from "../components/Sidebar";
import { MainContentDashBoard } from "../components/MainContentDashBoard";
import React, { useState } from "react";
import { BookingProvider } from '../context/BookingsContext';
export function Dashboard() {
  const [open, setOpen] = React.useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleStatusSelect = (...statuses) => {
    setSelectedStatuses(statuses);
  };

  return (
    <BookingProvider>
      <div className="flex flex-row">
        {/* Sidebar với chiều rộng cố định */}
        <div className="">
          <Sidebar
            open={open}
            handleOpen={handleOpen}
            onSelect={handleStatusSelect}
            className="w-1/4" // Hoặc đặt chiều rộng cụ thể như "w-64"
          />
        </div>
        {/* Nội dung chính chiếm phần còn lại */}
        <div className="">
          <MainContentDashBoard statuses={selectedStatuses} />
        </div>
      </div>
    </BookingProvider>
  );
}
