import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { handleLogout } = useAuth();
  return (
    <nav className="w-48 min-h-screen bg-primary  ">
      <div className="sticky top-0 flex flex-col justify-between h-screen">
        <ul>
          <li className="py-2 pl-5">
            <Link to="/">
              <img src="/favicon.ico" className="h-14 p-2" />
            </Link>
          </li>

          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <FaUserNinja />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>

        <div className="flex flex-col items-start p-5">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button onClick={handleLogout} className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-2">
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? "text-white bg-gray-400" : "text-white") + " py-2 pl-3 flex w-full hover:bg-gray-400 hover:text-black items-center text-lg space-x-2"} to={to}>
      {children}
    </NavLink>
  );
};
