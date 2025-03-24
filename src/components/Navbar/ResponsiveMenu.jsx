import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, user, handleLogout }) => {
  return (
    <div
      className={`fixed top-0 bottom-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md ${
        showMenu ? "left-0" : "-left-[100%]"
      }`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>{user ? user.name : "Hello User"}</h1>
            <h1 className="text-sm text-slate-500">{user ? user.role : "Guest"}</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data) => (
              <li key={data.id}>
                <Link to={data.link} className="mb-5 inline-block">
                  {data.name}
                </Link>
              </li>
            ))}
            
            {user && (
              <>
                {user.role === "admin" && (
                  <li>
                    <Link to="/AdminDashboard" className="mb-5 inline-block">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                {user.role === "rental" && (
                  <li>
                    <Link to="/RentalDashboard" className="mb-5 inline-block">
                      Rental Dashboard
                    </Link>
                  </li>
                )}
                
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>Made with ❤ by Aayush</h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
