import React from "react";
import "./Links.css";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div className="links">
      <Link to="/" className="link link-selected">
        Inventory
      </Link>

      <Link to="/" className="link">
        Hey
      </Link>
    </div>
  );
};

export default Links;
