import React, { useContext } from "react";
import BookingList from "./BookingList";
import { BookingContext } from "../context/BookingsContext";
import RevenueAnalytics from "../components/RevenueAnalytics";
import * as XLSX from "xlsx";
import RoomTypeManagement from "./RoomTypeManagement";
import RoomManagement from "./RoomManagement";
import { UserContext } from "../context/UserContext";
import UserList from "./UserList";
import AccountManagement from "./AccountManagement";

export function MainContentDashBoard({ statuses }) {
  const bookings = useContext(BookingContext);
  const users = useContext(UserContext);

  // Lọc bookings theo trạng thái mà người dùng đã chọn
  const filteredBookings = statuses.length
    ? bookings.filter((booking) => statuses.includes(booking.status))
    : bookings;

  const showBookingList =
    statuses.includes("pending") ||
    statuses.includes("confirmed") ||
    statuses.includes("amended") ||
    statuses.includes("checked_in") ||
    statuses.includes("checked_out") ||
    statuses.some((status) =>
      ["failed", "no_show", "cancelled", "refunded", "successful"].includes(
        status
      )
    );

  const showUserList =
    statuses.includes("admin") ||
    statuses.includes("employee") ||
    statuses.includes("manager") ||
    statuses.includes("customer");
  const filteredUsers = statuses.length
    ? users.filter((user) => statuses.includes(user.role))
    : users;

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");

    // Lấy thời gian hiện tại và định dạng
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = now.toTimeString().slice(0, 5).replace(":", "-"); // HH-MM
    const filename = `Bookings_${formattedDate}_${formattedTime}.xlsx`;

    // Xuất file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div>
      {/* Nút xuất Excel */}
      {showBookingList && (
        <button className="bg-green-300 w-1/6" onClick={exportToExcel}>
          Xuất Excel
        </button>
      )}
      {/* Hiển thị BookingList với danh sách đã được lọc */}
      {showBookingList ? (
        <BookingList bookings={filteredBookings} />
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
      ) :null}
    </div>
  );
}
