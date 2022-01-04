import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.css";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/signIn">
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/loggedIn">
            Logged In
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
