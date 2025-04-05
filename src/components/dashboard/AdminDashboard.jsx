import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Users, Car, Calendar, DollarSign, 
  LogOut, Settings, Bell, TrendingUp, 
  Activity, Clock
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    activeBookings: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);

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
          { id: 5, type: "User Update", details: "User Sarah Johnson updated profile", timestamp: "12 hours ago" },
        ]);
        
        // Sample revenue data for chart
        setRevenueData([
          { name: 'Jan', revenue: 65000 },
          { name: 'Feb', revenue: 78000 },
          { name: 'Mar', revenue: 98000 },
          { name: 'Apr', revenue: 87000 },
          { name: 'May', revenue: 105000 },
          { name: 'Jun', revenue: 125000 },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "User Registration":
        return <Users size={20} className="text-blue-500" />;
      case "Car Added":
        return <Car size={20} className="text-green-500" />;
      case "Booking":
        return <Calendar size={20} className="text-purple-500" />;
      case "Payment":
        return <DollarSign size={20} className="text-emerald-500" />;
      default:
        return <Activity size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Here's what's happening today</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-white p-2 rounded-full shadow hover:shadow-md">
              <Bell size={24} className="text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:shadow-md">
              <Settings size={24} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors duration-200"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array(4).fill().map((_, i) => (
              <div key={i} className="w-full h-32 bg-gray-200 rounded-lg animate-pulse" />
            ))
          ) : (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.totalUsers}</p>
                    <p className="text-xs text-green-500 mt-2 flex items-center">
                      <TrendingUp size={14} className="mr-1" /> +8% from last month
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users size={24} className="text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Cars</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.totalCars}</p>
                    <p className="text-xs text-green-500 mt-2 flex items-center">
                      <TrendingUp size={14} className="mr-1" /> +12% from last month
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Car size={24} className="text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Bookings</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{dashboardStats.activeBookings}</p>
                    <p className="text-xs text-amber-500 mt-2 flex items-center">
                      <Activity size={14} className="mr-1" /> +4% from last month
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar size={24} className="text-purple-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      ${dashboardStats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-500 mt-2 flex items-center">
                      <TrendingUp size={14} className="mr-1" /> +15% from last month
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <DollarSign size={24} className="text-emerald-500" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                <Activity size={20} className="mr-2" /> Quick Actions
              </h2>
              <div className="space-y-4">
                <Link to="/UserManagement" className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 px-6 rounded-lg transition-colors duration-200 group">
                  <span className="flex items-center">
                    <Users size={20} className="mr-3" />
                    Manage Users
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </Link>
                
                <Link to="/ManageCars" className="flex items-center justify-between bg-green-50 hover:bg-green-100 text-green-700 font-medium py-4 px-6 rounded-lg transition-colors duration-200 group">
                  <span className="flex items-center">
                    <Car size={20} className="mr-3" />
                    Manage Cars
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </Link>
                
                <Link to="/admin/bookings" className="flex items-center justify-between bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-4 px-6 rounded-lg transition-colors duration-200 group">
                  <span className="flex items-center">
                    <Calendar size={20} className="mr-3" />
                    View Bookings
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </Link>
                
                <Link to="/admin/reports" className="flex items-center justify-between bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-4 px-6 rounded-lg transition-colors duration-200 group">
                  <span className="flex items-center">
                    <TrendingUp size={20} className="mr-3" />
                    Generate Reports
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {/* Revenue Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                <TrendingUp size={20} className="mr-2" /> Revenue Overview
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                <Clock size={20} className="mr-2" /> Recent Activities
              </h2>
              
              {recentActivities.length === 0 ? (
                <p className="text-center text-gray-500 my-8">No recent activities</p>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="mr-4">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.type}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                      </div>
                      <div className="text-xs text-gray-400">{activity.timestamp}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;