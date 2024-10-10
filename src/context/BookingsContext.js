import React, { createContext, useState, useEffect } from 'react';

// Tạo context
export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bookings/');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={bookings}>
      {children}
    </BookingContext.Provider>
  );
};
