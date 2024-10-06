import React from 'react';
//components
import Header from './Header';
import Footer from './Footer';
// pages
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
