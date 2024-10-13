import React, { useEffect, useState } from "react";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone_number: "",
    role: "customer",
    password: "", // Thêm trường mật khẩu
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const roleOptions = [
    { value: "manager", label: "Quản lý" },
    { value: "customer", label: "Khách hàng" },
    { value: "employee", label: "Nhân viên" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/api/users/");
    const data = await response.json();
    setUsers(data);
    setFilteredUsers(data);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = async () => {
    const response = await fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setFilteredUsers([...filteredUsers, addedUser]);
      resetForm();
      setErrorMessage("");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Thêm người dùng thất bại.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      password: "", // Xóa mật khẩu khi chỉnh sửa
    });
    setIsFormVisible(true);
  };

  const handleUpdateUser = async () => {
    const response = await fetch(
      `http://localhost:8000/api/users/${editingUser.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      resetForm();
      setErrorMessage("");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Cập nhật người dùng thất bại.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa người dùng này không?"
    );

    if (!confirmDelete) return; // Nếu người dùng hủy, không làm gì thêm

    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Xóa người dùng thất bại");
      }

      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setNewUser({
      username: "",
      email: "",
      phone_number: "",
      role: "customer",
      password: "", // Đặt lại mật khẩu
    });
    setIsFormVisible(false);
    setErrorMessage("");
  };

  return (
    <div className="account-management">
      <h1 className="text-3xl font-bold mb-4">Quản lý tài khoản</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        className="border-2 border-gray-300 p-2 mb-4 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />

      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        {isFormVisible ? "Ẩn biểu mẫu" : "Hiện biểu mẫu"}
      </button>

      {isFormVisible && (
        <div className="user-form mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </h2>

          <input
            type="text"
            placeholder="Tên người dùng"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newUser.phone_number}
            onChange={(e) =>
              setNewUser({ ...newUser, phone_number: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <select
            className="border-2 border-gray-300 p-2 mb-2 w-full"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>

          {editingUser ? (
            <button
              onClick={handleUpdateUser}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Cập nhật người dùng
            </button>
          ) : (
            <button
              onClick={handleAddUser}
              className="bg-green-500 text-white px-4 py-2"
            >
              Thêm người dùng
            </button>
          )}
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Tên người dùng</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone_number}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
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

export default AccountManagement;
