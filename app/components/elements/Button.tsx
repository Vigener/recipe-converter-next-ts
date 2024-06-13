import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<
  ButtonProps & { size?: "normal" | "small"; color?: "primary" | "secondary" }
> = ({ children, onClick, className, size, color }) => {
  const buttonSize = size === "small" ? "px-2 py-1 text-sm" : "px-4 py-2";
  const buttonColor =
    color === "secondary"
      ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
      : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500";

  return (
    <button
      onClick={onClick}
      className={`rounded-lg shadow-md text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonSize} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
