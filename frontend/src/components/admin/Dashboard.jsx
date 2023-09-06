import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300">
      <ul className="pl-5">
        <li className="py-2">
          <Link to="/">
            <img src="/favicon.ico" className="h-14 p-2" />
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <NavItem to="/">Home</NavItem>
        </li>
        <li>
          <NavItem to="/movies">Movies</NavItem>
        </li>
        <li>
          <NavItem to="/actors">Actors</NavItem>
        </li>
      </ul>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? "text-white bg-gray-400" : "text-white") + " py-2 pl-3 flex w-full hover:bg-gray-400 hover:text-black"} to={to}>
      {children}
    </NavLink>
  );
};
