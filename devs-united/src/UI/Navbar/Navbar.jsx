import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.css";
import "./Navbar.css";
import { useUserAreaContext } from "../../providers/UserAreaProvider";

const Navbar = () => {
  const [author] = useUserAreaContext();

  return (
    <nav>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/">
            Entrance
          </NavLink>
        </li>
        <li>
          {author && (
            <NavLink activeClassName={classes.active} to="/loggedin">
              Logged In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
