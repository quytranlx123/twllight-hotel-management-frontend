import React, { useState } from "react";

const getRoleClass = (role) => {
  switch (role) {
    case "admin":
      return "bg-blue-300 text-blue-900";
    case "manager":
      return "bg-green-300 text-green-900";
    case "employee":
      return "bg-purple-300 text-purple-900";
    case "customer":
      return "bg-yellow-300 text-yellow-900";
    default:
      return "bg-gray-300 text-gray-900";
  }
};

const UserList = ({ users }) => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    "ID",
    "Username",
    "Email",
    "First Name",
    "Last Name",
    "Role",
    "Phone Number",
  ];

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full max-w-6xl ml-4">
        <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
        
        {/* Search input field */}
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          className="border-2 border-gray-300 p-2 mb-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="overflow-hidden">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-3 border text-center">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-3 border text-center">{user.id}</td>
                  <td className="px-4 py-3 border text-center">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 border text-center">{user.email}</td>
                  <td className="px-4 py-3 border text-center">
                    {user.first_name}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {user.last_name}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {user.phone_number}
                  </td>
                  <td
                    className={`px-4 py-3 border text-center ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between w-60">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;