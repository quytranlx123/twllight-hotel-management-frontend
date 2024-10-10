import React from 'react';
// logo
import LogoWhite from '../assets/img/logo-white.svg';

const Footer = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className='container mx-auto text-white flex justify-between items-center'>
        {/* logo */}
        <img src={LogoWhite} alt='Logo' />
        <span>Copyright &copy; 2024. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
