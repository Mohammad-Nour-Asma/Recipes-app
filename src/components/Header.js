import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">Recipe Search</Link>
    </div>
  );
}

export default Header;
