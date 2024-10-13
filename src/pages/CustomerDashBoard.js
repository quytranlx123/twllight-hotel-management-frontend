import React, { useState } from "react";
import { CustomerSidebar } from "../components/CustomerSideBar";
import CustomerProfile from "../components/CustomerProfile";
function CustomerDashBoard() {
  const customer = {
    first_name: "Jane",
    last_name: "Doe",
    avatar: "",
    phone_number: "123456789",
    address: "123 Main St",
    date_of_birth: "1990-01-01",
    identity_card_number: "ID12345678",
  };

  const handleSave = (updatedData) => {
    // Xử lý lưu dữ liệu ở đây (gửi yêu cầu API chẳng hạn)
    console.log("Updated customer data:", updatedData);
  };
  return (
    <div className="flex">
      <div className="w-3/12 md:w-1/4 bg-gray-200 p-4">
        <CustomerSidebar />
      </div>
      <div
        className="p-4 w-full
      "
      >
        <CustomerProfile customer={customer} onSave={handleSave} />
      </div>
    </div>
  );
}

export default CustomerDashBoard;
