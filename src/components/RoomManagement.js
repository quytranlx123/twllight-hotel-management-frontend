import React, { useEffect, useState } from "react";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    room_type: "", // Đây sẽ chứa ID loại phòng
    name: "",
    status: "trống",
    is_available: true,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const statusOptions = [
    { value: "trống", label: "Trống" },
    { value: "đã đặt", label: "Đã đặt" },
    { value: "đang bảo trì", label: "Đang bảo trì" },
  ];

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, []);

  const fetchRooms = async () => {
    const response = await fetch("http://localhost:8000/api/rooms/");
    const data = await response.json();
    setRooms(data);
    setFilteredRooms(data);
  };

  const fetchRoomTypes = async () => {
    const response = await fetch("http://localhost:8000/api/roomtypes/");
    const data = await response.json();
    setRoomTypes(data);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = rooms.filter((room) =>
      room.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleAddRoom = async () => {
    const response = await fetch("http://localhost:8000/api/room/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });

    if (response.ok) {
      const addedRoom = await response.json();
      setRooms([...rooms, addedRoom]);
      setFilteredRooms([...filteredRooms, addedRoom]);
      resetForm();
      setErrorMessage("");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Thêm phòng thất bại.");
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setNewRoom({
      room_type: room.room_type,
      name: room.name,
      status: room.status,
      is_available: room.is_available,
    });
    setIsFormVisible(true);
  };

  const handleUpdateRoom = async () => {
    const response = await fetch(
      `http://localhost:8000/api/room/update/${editingRoom.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      }
    );

    if (response.ok) {
      const updatedRoom = await response.json();
      const updatedRooms = rooms.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room
      );
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
      resetForm();
      setErrorMessage("");
      console.log(newRoom)
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Cập nhật phòng thất bại.");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/rooms/delete/${id}/`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Xóa phòng thất bại");
      }

      const updatedRooms = rooms.filter((room) => room.id !== id);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
    } catch (error) {
      console.error("Lỗi khi xóa phòng:", error);
    }
  };

  const resetForm = () => {
    setEditingRoom(null);
    setNewRoom({
      room_type: "",
      name: "",
      status: "trống",
      is_available: true,
    });
    setIsFormVisible(false);
    setErrorMessage("");
  };

  return (
    <div className="room-management">
      <h1 className="text-3xl font-bold mb-4">Quản lý Phòng</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Tìm kiếm phòng..."
        className="border-2 border-gray-300 p-2 mb-4 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />

      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        {isFormVisible ? "Ẩn Form" : "Hiện Form"}
      </button>

      {isFormVisible && (
        <div className="room-form mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {editingRoom ? "Chỉnh sửa Phòng" : "Thêm Phòng"}
          </h2>
          <select
            className="border-2 border-gray-300 p-2 mb-2 w-full text-white bg-gray-800" // Thêm class cho màu chữ và nền
            value={newRoom.room_type}
            onChange={(e) =>
              setNewRoom({ ...newRoom, room_type: e.target.value })
            }
          >
            <option value="" disabled>
              Chọn Loại Phòng
            </option>
            {roomTypes.length > 0 ? (
              roomTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            ) : (
              <option disabled>Không có phòng nào</option>
            )}
          </select>

          <input
            type="text"
            placeholder="Tên Phòng"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />

          <select
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.status}
            onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newRoom.is_available}
              onChange={(e) =>
                setNewRoom({ ...newRoom, is_available: e.target.checked })
              }
            />
            Có sẵn
          </label>

          {editingRoom ? (
            <button
              onClick={handleUpdateRoom}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Cập nhật Phòng
            </button>
          ) : (
            <button
              onClick={handleAddRoom}
              className="bg-green-500 text-white px-4 py-2"
            >
              Thêm Phòng
            </button>
          )}
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Loại Phòng</th>
            <th className="border p-2">Tên Phòng</th>
            <th className="border p-2">Trạng Thái</th>
            <th className="border p-2">Có Sẵn</th>
            <th className="border p-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.id}>
              <td className="border p-2 text-center">{room.room_type}</td>
              <td className="border p-2 text-center">{room.name}</td>
              <td className="border p-2 text-center">{room.status}</td>
              <td
                className={`border p-2 text-center ${
                  room.is_available
                    ? "bg-green-700 text-yellow-500"
                    : "bg-red-500 text-yellow-600"
                }`}
              >
                {room.is_available ? "Có" : "Không"}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEditRoom(room)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;
