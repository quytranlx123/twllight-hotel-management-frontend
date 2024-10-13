import React, { useState } from "react";
import CustomerProfile from "./CustomerProfile";

const CustomerMainContentDashboard = () => {
  const [open, setOpen] = useState(false);

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
    <div className="container mx-auto">
      <CustomerProfile customer={customer} onSave={handleSave} />
    </div>
  );
};

export default CustomerMainContentDashboard;
