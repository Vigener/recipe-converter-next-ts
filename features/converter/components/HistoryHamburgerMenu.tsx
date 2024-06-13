import React, { useState } from "react";
import RecipeHistory from "./RecipeHistory";

const HistoryHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="bg-white h-full w-64 fixed left-0 overflow-y-auto">
          <button onClick={handleToggle}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <RecipeHistory />
        </div>
      </div>
    </div>
  );
};

export default HistoryHamburgerMenu;
