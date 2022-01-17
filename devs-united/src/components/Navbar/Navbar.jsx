import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.css";
import "./Navbar.css";

const Navbar = ({signOut}) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/signin">
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/loggedin">
            Logged In
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
