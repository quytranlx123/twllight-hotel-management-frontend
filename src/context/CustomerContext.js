import React, { createContext, useState, useEffect } from "react";
import backendUrl from "../config";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  // Định nghĩa các trường
  const initialCustomerFields = {
    user: "",
    first_name: "",
    last_name: "",
    avatar: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    identity_card_number: "",
  };

  // Hàm để lấy thông tin người dùng
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${backendUrl}/customer/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      setCustomer(data); // Lưu thông tin người dùng
    } catch (error) {
      console.error("Error fetching user:", error);
      setCustomer(null); // Nếu có lỗi, set customer thành null
    } finally {
      setLoading(false); // Đánh dấu rằng đã hoàn thành việc tải
    }
  };
  
  useEffect(() => {
    if (customer) {
      console.log("customer:", customer);
    }
  }, [customer]);

  return (
    <CustomerContext.Provider
      value={{ customer, loading, fetchUser, initialCustomerFields }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
