import React, { useState } from "react";
import { formatDateToDDMMYYYY } from "../Recycle_Function/FormantDateToDDMMYYYY"; // Ensure this path is correct

const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-200 text-yellow-900";
    case "confirmed":
      return "bg-green-300 text-green-900";
    case "checked_in":
      return "bg-blue-300 text-blue-900";
    case "checked_out":
      return "bg-indigo-200 text-indigo-900";
    case "cancelled":
      return "bg-red-300 text-red-900";
    case "no_show":
      return "bg-gray-200 text-gray-900";
    case "awaiting_payment":
      return "bg-orange-300 text-orange-900";
    case "refunded":
      return "bg-teal-200 text-teal-900";
    case "amended":
      return "bg-purple-200 text-purple-900";
    case "failed":
      return "bg-red-600 text-white";
    case "successful":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-300 text-gray-900";
  }
};

const BookingList = ({ bookings }) => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Filter bookings based on the search term
  const filteredBookings = bookings.filter((booking) => {
    const fullName =
      `${booking.guest_firstname} ${booking.guest_lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const selectedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const columns = [
    "ID",
    "Họ",
    "Tên",
    "Tên Phòng",
    "Loại Phòng",
    "Ngày Đặt",
    "Ngày Nhận Phòng",
    "Ngày Trả Phòng",
    "Tiền phòng",
    "Tiền dịch vụ",
    "Tiền phụ thu",
    "Giảm Giá",
    "Tổng tiền",
    "Trạng Thái",
  ];

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full max-w-6xl ml-4">
        <h2 className="text-2xl font-bold mb-4">Danh sách đặt phòng</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo họ và tên"
            className="px-4 py-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-hidden">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 border text-center">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-3 border text-center">{booking.id}</td>
                  <td className="px-4 py-3 border text-center">
                    {booking.guest_lastname}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.guest_firstname}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.room_name}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.room_type}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {formatDateToDDMMYYYY(booking.created_at)}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.check_in_date}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.check_out_date}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.stay_price}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.services_price}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.surcharge_price}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.promotion_price}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {booking.total_price}
                  </td>
                  <td
                    className={`hover:bg-transparent px-4 py-3 border text-center ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    <button>{booking.status}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between w-60">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingList;
