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
} from 'react-icons/fa';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [adults, setAdults] = useState("1 Adult");
  const [kids, setKids] = useState("0 Kids");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/roomtypes/'); // Thay thế với URL của bạn
        const apiData = await response.json();

        // Định dạng dữ liệu
        const formattedData = apiData.map(room => ({
          id: room.id,
          name: room.name,
          description: room.description,
          facilities: [
            { name: 'Wifi', icon: <FaWifi /> },
            { name: 'Coffee', icon: <FaCoffee /> },
            { name: 'Bath', icon: <FaBath /> },
            { name: 'Parking Space', icon: <FaParking /> },
            { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
            { name: 'Breakfast', icon: <FaHotdog /> },
            { name: 'GYM', icon: <FaStopwatch /> },
            { name: 'Drinks', icon: <FaCocktail /> },
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
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
    console.log()
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
