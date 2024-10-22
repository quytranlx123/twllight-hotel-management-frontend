import React, { useContext } from "react";
import BookingList from "./BookingList";
import { BookingContext } from "../context/BookingsContext";
import RevenueAnalytics from "../components/RevenueAnalytics";
import * as XLSX from "xlsx";
import RoomTypeManagement from "./RoomTypeManagement";
import RoomManagement from "./RoomManagement";
import { ListUserContext } from "../context/ListUserContext";
import UserList from "./UserList";
import AccountManagement from "./AccountManagement";

export function MainContentDashBoard({ statuses }) {
  const { bookings, fetchBookings } = useContext(BookingContext);
  const users = useContext(ListUserContext);

  const filteredBookings = statuses.length
    ? bookings.filter((booking) => statuses.includes(booking.status))
    : bookings;

  const filteredUsers = statuses.length
    ? users.filter((user) => statuses.includes(user.role))
    : users;

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");

    const now = new Date();
    const filename = `Bookings_${now.toISOString().slice(0, 10)}_${now
      .toTimeString()
      .slice(0, 5)
      .replace(":", "-")}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const showBookingList = [
    "pending",
    "confirmed",
    "amended",
    "checked_in",
    "checked_out",
    "cancelled",
    "refunded",
    "failed",
    "no_show",
    "awaiting_payment",
    "successful",
    "no_show"
  ].some((status) => statuses.includes(status));
  const showUserList = ["admin", "employee", "manager", "customer"].some(
    (role) => statuses.includes(role)
  );

  return (
    <div>
      {showBookingList && (
        <button className="bg-green-300 w-1/6" onClick={exportToExcel}>
          Xuất Excel
        </button>
      )}
      {showBookingList ? (
        <BookingList
          bookings={filteredBookings}
          value={bookings}
          fetchBookings={fetchBookings}
        />
      ) : showUserList ? (
        <UserList users={filteredUsers} />
      ) : statuses.includes("revenueAnalytics") ? (
        <RevenueAnalytics />
      ) : statuses.includes("roomTypes") ? (
        <RoomTypeManagement />
      ) : statuses.includes("rooms") ? (
        <RoomManagement />
      ) : statuses.includes("account") ? (
        <AccountManagement />
      ) : null}
    </div>
  );
}
