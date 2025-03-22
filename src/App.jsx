import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; 
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import RentalDashboard from "./components/dashboard/RentalDashboard";
import AddCar from "./components/rental/AddCar";
import ManageBookings from "./components/rental/ManageBookings";
import UserManagement from "./components/UserManagement/UserManagement";
import ManageCars from "./components/CarList/ManageCars";
import CustomerDashboard from "./components/dashboard/CustomerDashboard";

const App = () => {
  // Dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Initialize AOS (Animation on Scroll)
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/RentalDashboard" element={<RentalDashboard />} />
          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />

          {/* Rental Management Routes */}
          <Route path="/rental/add-car" element={<AddCar />} />

          <Route path="/rental/bookings" element={<ManageBookings />} />

          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/manageCars" element={<ManageCars />} />
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Navbar theme={theme} setTheme={handleThemeChange} />
                <Hero theme={theme} />
                <About />
                <Services />
                <CarList />
                <Footer/>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
