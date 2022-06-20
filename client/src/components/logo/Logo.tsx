import React from "react";
import "./Logo.css";
import LogoImg from "../../assets/img/general/icon.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImg}></img>
      <div className="logo-name">Café Shop</div>
    </div>
  );
};

export default Logo;
