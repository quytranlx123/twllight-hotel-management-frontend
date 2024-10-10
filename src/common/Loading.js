// Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner">Loading...</div>
      {/* Bạn có thể thay thế div này bằng một spinner hoặc animation */}
    </div>
  );
};

export default Loading;
