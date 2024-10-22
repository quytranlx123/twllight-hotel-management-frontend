import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";

// logo
import LogoDark from "../assets/img/logo-dark.png";
import LogoWhite from "../assets/img/logo-white.png";
// menu người dùng
import ProfileMenuCustomer from "./ProfileMenuCustomer";
import ProfileMenuEmployee from "./ProfileMenuEmployee";
import ProfileMenuManager from "./ProfileMenuManager";
import ProfileMenu from "./ProfileMenu";
import ProfileMenuWithRoleNotFound from "./ProfileMenuRoleNotFound";
import ProfileMenuAdmin from "./ProfileMenuAdmin"

const Header = () => {
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sử dụng useMemo để lưu trữ component menu người dùng dựa trên role
  const profileMenu = useMemo(() => {
    const validRoles = ["customer", "employee", "manager", "admin"];

    // Nếu chưa có role (người dùng chưa đăng nhập)
    if (!role) {
      return <ProfileMenu />; // Component mặc định cho người dùng chưa đăng nhập
    }

    // Kiểm tra role
    if (!validRoles.includes(role)) {
      return <ProfileMenuWithRoleNotFound />;
    }

    switch (role) {
      case "customer":
        return <ProfileMenuCustomer />;
      case "employee":
        return <ProfileMenuEmployee />;
      case "manager":
        return <ProfileMenuManager />;
      case "admin":
        return <ProfileMenuAdmin />;
      default:
        return <ProfileMenuWithRoleNotFound />; // Trường hợp không hợp lệ
    }
  }, [role]);

  return (
    <header
      className={`${
        header ? "bg-white py-3 my-1 shadow-lg" : "bg-transparent py-2"
      } fixed z-50 w-full transition-all duration-500z`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* Logo */}
        <a href="/">
          <img
            className="w-[100px]"
            src={header ? LogoWhite : LogoDark}
            alt="Logo"
          />
        </a>
        {/* Điều hướng */}
        <nav
          className={`${
            header ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          {["Home", "Rooms", "Restaurant", "Spa", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:text-accent transition">
              {item}
            </a>
          ))}
          {/* Nút menu người dùng */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              type="button"
              className={`${
                header ? "" : "bg-transparent"
              } flex items-center justify-center p-2 rounded-lg shadow-md hover:text-accent focus:outline-none duration-100 ease-out`}
            >
              <div className="w-4 h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="stroke-current"
                  style={{ strokeWidth: 3 }}
                >
                  <g fill="none">
                    <path d="M2 16h28M2 24h28M2 8h28" />
                  </g>
                </svg>
              </div>
              <div className="w-6 h-6 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="fill-current"
                >
                  <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z" />
                </svg>
              </div>
              {/* Render menu người dùng một lần dựa trên role */}
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
                {profileMenu}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
