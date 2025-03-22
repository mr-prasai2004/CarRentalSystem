import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import AdminDashboard from "../dashboard/AdminDashboard";
import { Link } from "react-router-dom";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "CARS",
    link: "/#cars",
  },
  {
    id: 3,
    name: "ABOUT",
    link: "/#about",
  },
  {
    id: 4,
    name: "BOOKING",
    link: "/#booking",
  },
  {
    id: 5,
    name: "Dashboard",
    link: "/#",
  },
  {
    id: 6,
    name: "Login",
    link: "/login",
  },
];
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">Car Chaiyo</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => {
                if (name === "Login" && user) {
                  return null; // Hide Login link if user is logged in
                }
                if (name === "Dashboard" && user) {
                  if (user.role === "admin") {
                    return (
                      <li key={id} className="py-4">
                        <Link
                          to="/AdminDashboard"
                          className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    );
                  }
                  if (user.role === "rental") {
                    return (
                      <li key={id} className="py-4">
                        <Link
                          to="/RentalDashboard"
                          className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                        >
                          Rental Dashboard
                        </Link>
                      </li>
                    );
                  }
                }
                return (
                  <li key={id} className="py-4">
                    <Link
                      to={link}
                      className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
              {theme === "dark" ? (
                <BiSolidSun onClick={() => setTheme("light")} className="text-2xl" />
              ) : (
                <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl" />
              )}
            </ul>
          </nav>
          {/* Mobile view */}
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl" />
            )}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};


export default Navbar;
