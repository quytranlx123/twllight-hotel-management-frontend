import React from "react";
import { formatDateToDDMMYYYY } from "../Recycle_Function/FormantDateToDDMMYYYY";

// Hàm trả về class CSS dựa vào trạng thái
const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-200 text-yellow-900"; // Nhạt hơn cho pending
    case "confirmed":
      return "bg-green-300 text-green-900"; // Xanh lá tươi cho confirmed
    case "checked_in":
      return "bg-blue-300 text-blue-900"; // Xanh dương tươi cho checked in
    case "checked_out":
      return "bg-indigo-200 text-indigo-900"; // Indigo sáng hơn cho checked out
    case "cancelled":
      return "bg-red-300 text-red-900"; // Đỏ tươi cho cancelled
    case "no_show":
      return "bg-gray-200 text-gray-900"; // Xám sáng cho no show
    case "awaiting_payment":
      return "bg-orange-300 text-orange-900"; // Cam tươi cho awaiting payment
    case "refunded":
      return "bg-teal-200 text-teal-900"; // Teal sáng hơn cho refunded
    case "amended":
      return "bg-purple-200 text-purple-900"; // Tím sáng hơn cho amended
    case "failed":
      return "bg-red-600 text-white"; // Đỏ đậm cho failed
    case "success":
      return "bg-green-600 text-white"; // Xanh lá đậm cho success
    default:
      return "bg-gray-300 text-gray-900"; // Xám sáng cho trạng thái không xác định
  }
};

const BookingList = ({ bookings }) => {
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
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-4">Danh sách đặt phòng</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((column) => (
                <th key={column} className="px-6 py-3 border text-center">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-3 border text-center">{booking.id}</td>
                <td className="px-6 py-3 border text-center">{booking.guest_lastname}</td>
                <td className="px-6 py-3 border text-center">{booking.guest_firstname}</td>
                <td className="px-6 py-3 border text-center">{booking.room_name}</td>
                <td className="px-6 py-3 border text-center">{booking.room_type}</td>
                <td className="px-6 py-3 border text-center">
                  {formatDateToDDMMYYYY(booking.created_at)} {/* Sử dụng hàm định dạng ngày */}
                </td>
                <td className="px-6 py-3 border text-center">{booking.check_in_date}</td>
                <td className="px-6 py-3 border text-center">{booking.check_out_date}</td>
                <td className="px-6 py-3 border text-center">{booking.stay_price}</td> {/* Tiền phòng */}
                <td className="px-6 py-3 border text-center">{booking.services_price}</td> {/* Tiền dịch vụ */}
                <td className="px-6 py-3 border text-center">{booking.surcharge_price}</td> {/* Tiền phụ thu */}
                <td className="px-6 py-3 border text-center">{booking.promotion_price}</td> {/* Giảm Giá */}
                <td className="px-6 py-3 border text-center">{booking.total_price}</td> {/* Tổng tiền */}
                <td className={`px-6 py-3 border text-center ${getStatusClass(booking.status)}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
