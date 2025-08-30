import React from "react";
import chefLogo from "/Chef-Logo.jpeg";

const Header = () => {
  return (
    <header className="flex justify-center items-center h-20 bg-white shadow-md">
      <img src={chefLogo} alt="Chef Logo" className="w-20" />
      <h1 className="font-normal text-xl ml-2">RecipeGenie</h1>
    </header>
  );
};

export default Header;
