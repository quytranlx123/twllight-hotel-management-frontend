import React from "react";

const ProfileMenu = () => {
  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 w-[260px]">
      <a
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        href="/login"
      >
        Đăng nhập
      </a>
      <a
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        href="/register"
      >
        Đăng ký
      </a>
      <a
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        href="/host/homes"
      >
        Cho thuê chỗ ở qua Airbnb
      </a>
      <a
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        href="/host/experiences?from_nav=1"
      >
        Tổ chức trải nghiệm
      </a>
      <a
        className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
        href="/help"
      >
        Trung tâm trợ giúp
      </a>
    </div>
  );
};

export default ProfileMenu;
