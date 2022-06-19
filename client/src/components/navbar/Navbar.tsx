import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import UserPreview from "../user_preview/UserPreview";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo></Logo>
      <UserPreview name="Robert Fox"></UserPreview>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        Buttons
        <div>Log Out</div>
      </div>
    </div>
  );
};

export default Navbar;
