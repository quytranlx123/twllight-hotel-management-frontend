import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRoomForm from './AddRoomForm';
import backendUrl from '../config';
const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await axios.get(`${backendUrl}/rooms/`);
    setRooms(response.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleRoomAdded = () => {
    fetchRooms();
  };

  return (
    <div className="mb-10">
      <AddRoomForm onRoomAdded={handleRoomAdded} />
      <h2 className="text-2xl font-semibold mb-4">Room List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Room Number</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{room.number}</td>
              <td className="border border-gray-300 p-2">{room.type}</td>
              <td className="border border-gray-300 p-2">${room.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
