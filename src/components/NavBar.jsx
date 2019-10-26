import React from "react";
import { Link, useHistory } from "react-router-dom";

import logo from "../assets/egany.png";

const NavBar = ({ setAuth }) => {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("vct-14");
    setAuth(null);
    history.replace("/login");
  }

  return (
    <nav className="flex items-center justify-between bg-white pa2 shadow-1">
      <Link className="link dim pointer" to="/">
        <img src={logo} alt="EGANY logo" title="Home" />
      </Link>
      <button
        className="button-reset bn bg-transparent black-50 hover-red pointer"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
