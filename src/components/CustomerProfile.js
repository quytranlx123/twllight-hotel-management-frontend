import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Sử dụng biểu tượng từ react-icons

const CustomerProfile = ({ customer, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: customer.first_name || "",
    last_name: customer.last_name || "",
    avatar: customer.avatar || "",
    phone_number: customer.phone_number || "",
    address: customer.address || "",
    date_of_birth: customer.date_of_birth || "",
    identity_card_number: customer.identity_card_number || "",
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Customer Profile</h2>

      <div
        className="mb-4 mr-10 relative flex justify-end"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={
            formData.avatar
              ? URL.createObjectURL(formData.avatar)
              : "/default-avatar.png"
          }
          alt="Avatar"
          className="w-48 h-40 rounded-xl border-2 border-gray-300"
        />
        {isHovering && (
          <label className="absolute top-0 right-0">
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="bg-blue-500 text-white rounded-full p-2 cursor-pointer transition-transform transform hover:scale-110 flex items-center justify-center">
              <FaEdit />
            </div>
          </label>
        )}
      </div>

      {/* Các trường nhập */}
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Identity Card Number</label>
        <input
          type="text"
          name="identity_card_number"
          value={formData.identity_card_number}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Nút lưu thay đổi */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CustomerProfile;
