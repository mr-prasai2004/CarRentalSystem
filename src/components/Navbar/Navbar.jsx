import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import ResponsiveMenu from "./ResponsiveMenu";

export const Navlinks = [
  { id: 1, name: "HOME", link: "/#" },
  { id: 2, name: "CARS", link: "/#cars" },
  { id: 3, name: "ABOUT", link: "/#about" },
  { id: 4, name: "BOOKING", link: "/#booking" },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage

  
  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/"); // Redirect to home (App.js)
    window.location.reload(); // Refresh to update state
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
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link to={link} className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500">
                    {name}
                  </Link>
                </li>
              ))}
              
              {user ? (
                <>
                  {/* Dashboard link based on role */}
                  {user.role === "admin" && (
                    <li className="py-4">
                      <Link to="/AdminDashboard" className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {user.role === "rental" && (
                    <li className="py-4">
                      <Link to="/RentalDashboard" className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500">
                        Rental Dashboard
                      </Link>
                    </li>
                  )}
                  
                  {/* Logout button */}
                  <li className="py-4">
                    <button onClick={handleLogout} className="text-lg font-medium text-red-600 hover:text-red-800">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="py-4">
                  <Link to="/login" className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500">
                    Login
                  </Link>
                </li>
              )}
              
              {theme === "dark" ? (
                <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
              ) : (
                <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
              )}
            </ul>
          </nav>
          
          {/* Mobile menu */}
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
            )}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} user={user} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
