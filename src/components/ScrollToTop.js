import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Đảm bảo rằng đây là một mảng

  return null; // Không có UI nào được render
};

export default ScrollToTop;
