// MainContentDashBoard.js
import React, { useContext, useState } from "react";
import BookingList from "./BookingList";
import { BookingContext } from "../context/BookingsContext";
import RevenueAnalytics from "../components/RevenueAnalytics"
export function MainContentDashBoard({ statuses }) {
  const bookings = useContext(BookingContext)
  const filteredBookings = statuses.length
    ? bookings.filter((booking) => statuses.includes(booking.status))
    : bookings;
  const [bookingList, setBookingList] = useState(false)
  // const []
  return (

    <>
        <BookingList bookings={filteredBookings} />
        <RevenueAnalytics />
    </>
  );
}
