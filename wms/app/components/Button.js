// components/Button.js

import React from 'react';

// You can pass custom classes for different styles and any other props you need
const Button = ({ onClick, children, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded bg-blue-500 text-white font-semibold disabled:bg-gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
