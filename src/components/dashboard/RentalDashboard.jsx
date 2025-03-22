import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCar, FaCheckCircle, FaTools, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const RentalDashboard = () => {
  const [carStats, setCarStats] = useState({
    totalCars: 0,
    availableCars: 0,
    rentedCars: 0,
    maintenanceCars: 0,
  });
  
  const [currentBookings, setCurrentBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setCarStats({ totalCars: 50, availableCars: 35, rentedCars: 12, maintenanceCars: 3 });
      setCurrentBookings([
        { id: 1, carName: "Toyota Camry", customerName: "Emily Johnson", startDate: "2024-03-05", endDate: "2024-03-10" },
        { id: 2, carName: "Honda Civic", customerName: "Michael Smith", startDate: "2024-03-03", endDate: "2024-03-08" },
      ]);
      setUpcomingBookings([
        { id: 3, carName: "Ford Mustang", customerName: "Sarah Williams", startDate: "2024-03-15", endDate: "2024-03-20" },
        { id: 4, carName: "BMW X3", customerName: "David Brown", startDate: "2024-03-18", endDate: "2024-03-25" },
      ]);
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Rental Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Cars", value: carStats.totalCars, icon: <FaCar />, color: "bg-blue-500" },
          { title: "Available Cars", value: carStats.availableCars, icon: <FaCheckCircle />, color: "bg-green-500" },
          { title: "Rented Cars", value: carStats.rentedCars, icon: <FaClock />, color: "bg-yellow-500" },
          { title: "Maintenance", value: carStats.maintenanceCars, icon: <FaTools />, color: "bg-red-500" },
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className={`p-5 rounded-xl text-white ${stat.color} flex items-center justify-between shadow-md`}
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4 mb-6">
        {[
          { text: "Add New Car", link: "/rental/add-car" },
          { text: "Manage Cars", link: "/rental/manage-cars" },
          { text: "Manage Bookings", link: "/rental/bookings" },
        ].map((action, index) => (
          <Link 
            key={index} 
            to={action.link} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {action.text}
          </Link>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search Bookings..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      {[{ title: "Current Bookings", data: currentBookings }, { title: "Upcoming Bookings", data: upcomingBookings }].map((section, index) => (
        <div key={index} className="bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Car</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Start Date</th>
                <th className="p-2 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {section.data
                .filter(booking =>
                  booking.carName.toLowerCase().includes(searchTerm) ||
                  booking.customerName.toLowerCase().includes(searchTerm)
                )
                .map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="p-2">{booking.carName}</td>
                    <td className="p-2">{booking.customerName}</td>
                    <td className="p-2">{booking.startDate}</td>
                    <td className="p-2">{booking.endDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RentalDashboard;