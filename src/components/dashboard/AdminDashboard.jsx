import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UserManagement from "../UserManagement/UserManagement";
import ManageCars from "../CarList/ManageCars";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    activeBookings: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate fetching data (replace with actual API calls)
        setDashboardStats({
          totalUsers: 1500,
          totalCars: 250,
          activeBookings: 75,
          totalRevenue: 125000,
        });
        setRecentActivities([
          { id: 1, type: "User Registration", details: "New user John Doe registered", timestamp: "2 hours ago" },
          { id: 2, type: "Car Added", details: "New BMW X5 added to fleet", timestamp: "4 hours ago" },
          { id: 3, type: "Booking", details: "Booking #1234 confirmed", timestamp: "6 hours ago" },
          { id: 4, type: "Payment", details: "Received payment for booking #1233", timestamp: "8 hours ago" },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse" /> // Loading placeholder
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-600">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalUsers}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-600">Total Cars</h3>
              <p className="text-3xl font-bold text-green-600">{dashboardStats.totalCars}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-600">Active Bookings</h3>
              <p className="text-3xl font-bold text-yellow-600">{dashboardStats.activeBookings}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-600">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-600">
                ${dashboardStats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex gap-6">
          <Link to="/UserManagement" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md text-center">
            Manage Users
          </Link>
          <Link to="/ManageCars" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md text-center">
  Manage Cars
</Link>

          <Link to="/admin/bookings" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md text-center">
            View Bookings
          </Link>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
        {recentActivities.length === 0 ? (
          <p className="text-center text-gray-500">No recent activities</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Type</th>
                <th className="py-2 px-4 text-left text-gray-600">Details</th>
                <th className="py-2 px-4 text-left text-gray-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{activity.type}</td>
                  <td className="py-2 px-4">{activity.details}</td>
                  <td className="py-2 px-4">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
