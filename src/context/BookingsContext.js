import React, { createContext, useState, useEffect } from "react";

// Tạo context
export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  // Hàm fetchBookings
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/bookings/");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
  };
  useEffect(() => {
    fetchBookings(); // Fetch ngay khi mount

    const intervalId = setInterval(() => {
      fetchBookings(); // Fetch mỗi 5 phút (300000 ms)
    }, 3000000);

    return () => clearInterval(intervalId); // Cleanup interval khi component unmount
  }, []);
  return (
    <BookingContext.Provider value={{ bookings, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
