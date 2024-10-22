import React, { useContext, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { CustomerContext } from "../context/CustomerContext";

const CustomerProfile = ({ customer, onSave }) => {
  const initialCustomerFields = {
    user: "",
    first_name: "",
    last_name: "",
    avatar: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    identity_card_number: "",
  };

  const [formData, setFormData] = useState(initialCustomerFields);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (customer && customer.length > 0) {
      const cust = customer[0];
      setFormData({
        ...initialCustomerFields,
        id: cust.id,
        user: cust.user,
        first_name: cust.first_name || "",
        last_name: cust.last_name || "",
        avatar: cust.avatar || null,
        phone_number: cust.phone_number || "",
        address: cust.address || "",
        date_of_birth: cust.date_of_birth || null,
        identity_card_number: cust.identity_card_number || "",
      });
    }
  }, [customer]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
        setFormData({ ...formData, avatar: files[0] || null }); // Ghi `null` nếu không có tệp nào
    } else {
        setFormData({ ...formData, [name]: value });
    }
};
const handleSubmit = (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  for (const key in formData) {
    if (formData[key] !== null) { // Chỉ thêm vào nếu không phải null
      formDataToSend.append(key, formData[key]);
    }
  }

  // In ra các cặp key-value
  for (let pair of formDataToSend.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  onSave(formDataToSend); // Gọi onSave với formDataToSend
};
  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Customer Profile</h2>

      <div
        className="mb-4 relative flex justify-end"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={
            formData.avatar instanceof File
              ? URL.createObjectURL(formData.avatar)
              : formData.avatar || "/default-avatar.png"
          }
          alt="Avatar"
          className="w-48 h-40 rounded-xl border-2 border-gray-300"
        />
        {isHovering && (
          <label className="absolute top-0 right-0">
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml

            "
            />
            <div className="bg-blue-500 text-white rounded-full p-2 cursor-pointer transition-transform transform hover:scale-110 flex items-center justify-center">
              <FaEdit />
            </div>
          </label>
        )}
      </div>

      {/* Các trường nhập */}
      {Object.keys(initialCustomerFields).map(
        (key) =>
          key !== "avatar" && (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700">
                {key.replace("_", " ").toUpperCase()}
              </label>
              <input
                type={key === "date_of_birth" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          )
      )}

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
