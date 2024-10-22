import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../Recycle_Function/LogoutFunction";

const ProfileMenuEmployee = () => {
  const { handleLogout, isOpen } = useLogout();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 w-[260px]">
      <Link
        to="/dashboard"
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
      >
        Bảng điều khiển
      </Link>
      <Link
        onClick={handleLogout}
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
      >
        Đăng xuất
      </Link>
    </div>
  );
};

export default ProfileMenuEmployee;
