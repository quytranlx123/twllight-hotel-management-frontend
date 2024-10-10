import React from 'react';
//components
import Header from './Header';
import Footer from './Footer';
// pages
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Nội dung chính */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
