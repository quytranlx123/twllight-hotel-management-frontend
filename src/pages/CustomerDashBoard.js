import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../context/CustomerContext";
import { CustomerSidebar } from "../components/CustomerSideBar";
import CustomerProfile from "../components/CustomerProfile";
import backendUrl from "../config";

function CustomerDashBoard() {
  const { customer, loading, fetchUser } = useContext(CustomerContext);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async (data) => {
    setIsSaving(true); // Bắt đầu quá trình lưu
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${backendUrl}/customer/update-profile/${data.get("id")}/`,
        {
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error updating customer data");
      }

      const result = await response.json();
      console.log("Updated customer data:", result);
      alert("Cập nhật dữ liệu thành công!"); // Thông báo thành công
    } catch (error) {
      console.error("Error updating customer data:", error);
      alert("Có lỗi xảy ra khi cập nhật dữ liệu.");
    } finally {
      setIsSaving(false); // Kết thúc quá trình lưu
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!customer) {
    return <div>No customer data available</div>;
  }

  return (
    <div className="flex">
      <div className="w-3/12 md:w-1/4 bg-gray-200 p-4">
        <CustomerSidebar />
      </div>
      <div className="p-4 w-full">
        <CustomerProfile
          customer={customer}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

export default CustomerDashBoard;
