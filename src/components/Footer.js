import React from "react";
// logo
import LogoDark from "../assets/img/logo-dark.png";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto text-white flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={LogoDark} alt="Logo" className="w-[100px]" />
          <span className="ml-4 text-lg">Trần Ngọc Quí - 2151050359</span>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 mt-4 md:mt-0">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </div>
        {/* Copyright */}
        <span className="text-center md:text-left">
          Copyright &copy; 2024. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
