import React, { useState } from "react";
import { formatDateToDDMMYYYY } from "../Recycle_Function/FormantDateToDDMMYYYY";
import backendUrl from "../config";
import { BookingContext } from '../context/BookingsContext';

const statusTransitions = {
  pending: ["confirmed", "cancelled", "awaiting_payment"],
  awaiting_payment: ["confirmed", "failed", "cancelled"],
  confirmed: ["checked_in", "cancelled", "no_show", "awaiting_payment"],
  checked_in: ["checked_out", "cancelled", "failed"],
  cancelled: ["refunded"],
  no_show: ["cancelled"],
  amended: ["confirmed", "checked_in", "cancelled"],
  failed: ["cancelled"],
  checked_out: ["successful"],
};

const statusClasses = {
  pending: "bg-yellow-200 text-yellow-900",
  confirmed: "bg-green-300 text-green-900",
  checked_in: "bg-blue-300 text-blue-900",
  checked_out: "bg-indigo-200 text-indigo-900",
  cancelled: "bg-red-300 text-red-900",
  no_show: "bg-gray-200 text-gray-900",
  awaiting_payment: "bg-orange-300 text-orange-900",
  refunded: "bg-teal-200 text-teal-900",
  amended: "bg-purple-200 text-purple-900",
  failed: "bg-red-600 text-white",
  successful: "bg-green-600 text-white",
};

const BookingList = ({ bookings, fetchBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const itemsPerPage = 7;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredBookings = bookings.filter((booking) => 
    `${booking.guest_firstname} ${booking.guest_lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  
  const columns = [
    "ID", "Họ", "Tên", "Số điện thoại", "Tên Phòng", 
    "Loại Phòng", "Ngày Đặt", "Ngày Nhận Phòng", 
    "Ngày Trả Phòng", "Tiền phòng", "Tiền dịch vụ", 
    "Tiền phụ thu", "Giảm Giá", "Tổng tiền", 
    "Trạng Thái", "Nhân viên xác nhận",
  ];

  const handleButtonClick = (booking) => {
    setSelectedBooking(booking);
    setIsFormVisible(true);
    setNewStatus(""); // Clear previous status when opening a new booking
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedBooking(null);
  };

  const changeStatus = (status) => setNewStatus(status);

  const confirmStatusChange = async () => {
    if (selectedBooking && newStatus) {
      const updatedBooking = { ...selectedBooking, status: newStatus };
      try {
        const response = await fetch(`${backendUrl}/bookings/${updatedBooking.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBooking),
        });

        if (!response.ok) throw new Error("Network response was not ok");
        
        await response.json();
        fetchBookings();
        closeForm();
      } catch (error) {
        console.error("Error updating booking:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full max-w-6xl ml-4">
        <h2 className="text-2xl font-bold mb-4">Danh sách đặt phòng</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo họ và tên"
            className="px-4 py-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-auto max-h-96">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 border text-center">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-3 border text-center">
                    <button onClick={() => handleButtonClick(booking)}>{booking.id}</button>
                  </td>
                  <td className="px-4 py-3 border text-center">{booking.guest_lastname}</td>
                  <td className="px-4 py-3 border text-center">{booking.guest_firstname}</td>
                  <td className="px-4 py-3 border text-center">{booking.guest_phone}</td>
                  <td className="px-4 py-3 border text-center">{booking.room_name}</td>
                  <td className="px-4 py-3 border text-center">{booking.room_type}</td>
                  <td className="px-4 py-3 border text-center">{formatDateToDDMMYYYY(booking.created_at)}</td>
                  <td className="px-4 py-3 border text-center">{booking.check_in_date}</td>
                  <td className="px-4 py-3 border text-center">{booking.check_out_date}</td>
                  <td className="px-4 py-3 border text-center">{booking.stay_price}</td>
                  <td className="px-4 py-3 border text-center">{booking.services_price}</td>
                  <td className="px-4 py-3 border text-center">{booking.surcharge_price}</td>
                  <td className="px-4 py-3 border text-center">{booking.promotion_price}</td>
                  <td className="px-4 py-3 border text-center">{booking.total_price}</td>
                  <td className={`px-4 py-3 border text-center ${statusClasses[booking.status]}`}>
                    {booking.status}
                  </td>
                  <td className="px-4 py-3 border text-center">{booking.employee}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {isFormVisible && selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Chi Tiết Booking {selectedBooking.id}</h3>
                <div className="mb-4">
                  <label className="block mb-2">Thay đổi trạng thái:</label>
                  <select
                    className="border border-gray-300 rounded w-full p-2"
                    onChange={(e) => changeStatus(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Chọn trạng thái mới</option>
                    {statusTransitions[selectedBooking.status].map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeForm}>
                    Hủy
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={confirmStatusChange} disabled={!newStatus}>
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trang trước
            </button>
            <button
              className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
