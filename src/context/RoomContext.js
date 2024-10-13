import React, { createContext, useEffect, useState } from "react";
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [adults, setAdults] = useState("1 Người lớn");
  const [kids, setKids] = useState("0 Trẻ em");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/roomtypes/"); // Thay thế với URL của bạn
        const apiData = await response.json();

        // Định dạng dữ liệu
        const formatText = (text) => {
          return text
            .split("_") // Tách chuỗi tại dấu gạch dưới
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu mỗi từ
            .join(" "); // Nối lại thành chuỗi với dấu cách
        };

        const formattedData = apiData.map((room) => ({
          id: room.id,
          room_type: formatText(room.room_type), // Sử dụng hàm formatText để định dạng tên phòng
          description: room.description,
          facilities: [
            { name: "Wifi", icon: <FaWifi /> },
            { name: "Coffee", icon: <FaCoffee /> },
            { name: "Bath", icon: <FaBath /> },
            { name: "Parking Space", icon: <FaParking /> },
            { name: "Swimming Pool", icon: <FaSwimmingPool /> },
            { name: "Breakfast", icon: <FaHotdog /> },
            { name: "GYM", icon: <FaStopwatch /> },
            { name: "Drinks", icon: <FaCocktail /> },
          ],
          size: room.area,
          maxPerson: room.capacity,
          price: room.price_per_night,
          image: room.image,
          imageLg: room.image_bathroom,
        }));
        setRoomData(formattedData);
        setRooms(formattedData); // Thiết lập rooms với dữ liệu lấy từ API
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchRoomData();
  }, []); // Gọi hàm chỉ một lần khi component được mount

  // Cập nhật tổng số người khi adults hoặc kids thay đổi
  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  }, [adults, kids]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    // Lọc phòng dựa trên tổng số người
    const newRooms = roomData.filter((room) => {
      return total <= room.maxPerson;
    });

    // Cập nhật state rooms
    setTimeout(() => {
      setRooms(newRooms);
      setLoading(false);
    }, 750);
  };

  return (
    <RoomContext.Provider
      value={{ rooms, adults, setAdults, kids, setKids, handleClick, loading }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
