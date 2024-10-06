import { Link } from "react-router-dom";
import React from "react";
import useLogout from "../Recycle_Function/LogoutFunction";

const ProfileMenuCustomer = () => {
  const { handleLogout, isOpen, setIsOpen } = useLogout();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 w-[260px]">
      <Link
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        to="/user"
      >
        Thông tin
      </Link>
      <Link
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        to="/host/experiences?from_nav=1"
      >
        Tổ chức trải nghiệm
      </Link>
      <Link
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        to="/help"
      >
        Trung tâm trợ giúp
      </Link>
      <button
        onClick={handleLogout}
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100 w-full text-left"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default ProfileMenuCustomer;
