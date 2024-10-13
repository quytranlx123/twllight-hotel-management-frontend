import React, { useEffect, useState } from "react";

const RoomTypeManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    room_type: "",
    capacity: "",
    area: "",
    price_per_night: "",
    description: "",
    image: null,
    image_bathroom: null,
    image_amenities: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // State để quản lý hiển thị form

  // Các loại phòng và dung lượng
  const roomTypes = [
    { value: "family", label: "Family" },
    { value: "ground_floor", label: "Ground Floor" },
    { value: "bungalow", label: "Bungalow" },
    { value: "ocean_view", label: "Ocean View Room" },
    { value: "deluxe", label: "Deluxe" },
    { value: "suite", label: "Suite" },
    { value: "resort", label: "Resort" },
  ];

  const capacityOptions = [
    { value: "2", label: "2 người" },
    { value: "4", label: "4 người" },
    { value: "6", label: "6 người" },
    { value: "8", label: "8 người" },
  ];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const response = await fetch("http://localhost:8000/api/roomtypes/");
    const data = await response.json();
    setRooms(data);
    setFilteredRooms(data);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = rooms.filter((room) =>
      room.room_type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleAddRoom = async () => {
    const formData = new FormData();
    Object.entries(newRoom).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch("http://localhost:8000/api/roomtype/create/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const addedRoom = await response.json();
      setRooms([...rooms, addedRoom]);
      setFilteredRooms([...filteredRooms, addedRoom]);
      resetForm();
      setErrorMessage("");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Failed to add room.");
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setNewRoom({
      room_type: room.room_type,
      capacity: room.capacity,
      area: room.area,
      price_per_night: room.price_per_night,
      description: room.description,
      image: null,
      image_bathroom: null,
      image_amenities: null,
    });
    setIsFormVisible(true); // Hiển thị form khi chỉnh sửa
  };

  const handleUpdateRoom = async () => {
    const formData = new FormData();
    Object.entries(newRoom).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    const response = await fetch(
      `http://localhost:8000/api/roomtype/update/${editingRoom.id}/`,
      {
        method: "PUT",
        body: formData,
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
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Failed to update room.");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/roomtype/delete/${id}/`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      const updatedRooms = rooms.filter((room) => room.id !== id);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const resetForm = () => {
    setEditingRoom(null);
    setNewRoom({
      room_type: "",
      capacity: "",
      area: "",
      price_per_night: "",
      description: "",
      image: null,
      image_bathroom: null,
      image_amenities: null,
    });
    setIsFormVisible(false); // Ẩn form khi reset
    setErrorMessage("");
  };

  return (
    <div className="room-management">
      <h1 className="text-3xl font-bold mb-4">Room Management</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Search rooms..."
        className="border-2 border-gray-300 p-2 mb-4 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />

      <button
        onClick={() => setIsFormVisible(!isFormVisible)} // Chuyển trạng thái hiển thị
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        {isFormVisible ? "Hide Form" : "Show Form"}
      </button>

      {isFormVisible && ( // Hiển thị form nếu isFormVisible là true
        <div className="room-form mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {editingRoom ? "Edit Room" : "Add Room"}
          </h2>
          <select
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.room_type}
            onChange={(e) =>
              setNewRoom({ ...newRoom, room_type: e.target.value })
            }
          >
            <option value="" disabled>
              Select Room Type
            </option>
            {roomTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.capacity}
            onChange={(e) =>
              setNewRoom({ ...newRoom, capacity: e.target.value })
            }
          >
            <option value="" disabled>
              Select Capacity
            </option>
            {capacityOptions.map((capacity) => (
              <option key={capacity.value} value={capacity.value}>
                {capacity.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Area (m²)"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.area}
            onChange={(e) => setNewRoom({ ...newRoom, area: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price per Night"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.price_per_night}
            onChange={(e) =>
              setNewRoom({ ...newRoom, price_per_night: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newRoom.description}
            onChange={(e) =>
              setNewRoom({ ...newRoom, description: e.target.value })
            }
          />

          <input
            type="file"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, image: e.target.files[0] })
            }
          />
          <input
            type="file"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, image_bathroom: e.target.files[0] })
            }
          />
          <input
            type="file"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, image_amenities: e.target.files[0] })
            }
          />

          {editingRoom ? (
            <button
              onClick={handleUpdateRoom}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Update Room
            </button>
          ) : (
            <button
              onClick={handleAddRoom}
              className="bg-green-500 text-white px-4 py-2"
            >
              Add Room
            </button>
          )}
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-center">Room Type</th>
            <th className="border p-2 text-center">Capacity</th>
            <th className="border p-2 text-center">Area (m²)</th>
            <th className="border p-2 text-center">Price per Night</th>
            <th className="border p-2 text-center">Description</th>
            <th className="border p-2 text-center">Images</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.id}>
              <td className="border p-2 text-center">{room.room_type}</td>
              <td className="border p-2 text-center">{room.capacity}</td>
              <td className="border p-2 text-center">{room.area}</td>
              <td className="border p-2 text-center">{room.price_per_night}</td>
              <td className="border p-2 text-center">{room.description}</td>
              <td className="border p-2 text-center">
                {room.image && (
                  <img src={room.image} alt="Room" className="h-16 w-16" />
                )}
                {room.image_bathroom && (
                  <img
                    src={room.image_bathroom}
                    alt="Bathroom"
                    className="h-16 w-16"
                  />
                )}
                {room.image_amenities && (
                  <img
                    src={room.image_amenities}
                    alt="Amenities"
                    className="h-16 w-16"
                  />
                )}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEditRoom(room)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTypeManagement;
