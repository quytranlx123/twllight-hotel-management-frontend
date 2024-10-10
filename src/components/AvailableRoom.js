import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableRooms = ({ roomType, onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Chỉ sử dụng cho component này

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rooms_with_roomtype/?room_type=${roomType}`
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
      }
    };

    if (roomType) {
      fetchRooms();
    }
  }, [roomType]);

  // Nhóm các phòng theo tầng dựa trên ký tự đầu tiên của số phòng
  const groupRoomsByFloor = (rooms) => {
    const grouped = {};
    rooms.forEach((room) => {
      const floor = room.name.charAt(0); // Lấy số đầu tiên làm tầng
      if (!grouped[floor]) {
        grouped[floor] = [];
      }
      grouped[floor].push(room);
    });

    // Sắp xếp các tầng từ cao xuống thấp
    const sortedFloors = Object.keys(grouped)
      .sort((a, b) => b - a)
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

    return sortedFloors;
  };

  const groupedRooms = groupRoomsByFloor(rooms);

  return (
    <div className="p-4">
      {Object.keys(groupedRooms).length > 0 ? (
        Object.keys(groupedRooms).map((floor) => (
          <div key={floor} className="mb-6">
            <h2 className="text-xl font-bold mb-4">Tầng {floor}</h2>
            <div className="grid grid-cols-5 gap-4">
              {groupedRooms[floor].map((room) => (
                <div
                  key={room.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    room.is_available
                      ? selectedRoom === room.id // Sử dụng ID thay vì tên
                        ? "bg-green-500" // Nếu phòng đã được chọn, dùng màu xanh lá
                        : "bg-pink-300 hover:bg-pink-400" // Màu nền phòng có sẵn
                      : "bg-gray-300 cursor-not-allowed" // Màu nền phòng không có sẵn
                  }`}
                  onClick={() => {
                    if (room.is_available) {
                      setSelectedRoom(room.id); // Chỉ cập nhật selectedRoom
                      console.log(room)
                      onSelectRoom(room); // Gọi hàm để truyền dữ liệu lên component cha
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  {room.is_available ? (
                    <span className="text-green-700">Có sẵn</span>
                  ) : (
                    <span className="text-red-700">Không có sẵn</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Không có phòng phù hợp</p>
      )}
    </div>
  );
};

export default AvailableRooms;
