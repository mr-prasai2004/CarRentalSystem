import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate fetching bookings data (replace with actual API call)
    const fetchBookings = async () => {
      setBookings([
        { id: 1, bookingId: "#1234", user: "John Doe", car: "BMW X5", status: "Pending" },
        { id: 2, bookingId: "#1235", user: "Jane Smith", car: "Audi Q7", status: "Confirmed" },
        { id: 3, bookingId: "#1236", user: "James Lee", car: "Tesla Model S", status: "Cancelled" },
      ]);
    };

    fetchBookings();
  }, []);

  const handleCancel = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
    ));
  };

  const handleConfirm = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "Confirmed" } : booking
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Booking Management</h1>

      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg p-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">Booking ID</th>
            <th className="py-2 px-4 text-left text-gray-600">User</th>
            <th className="py-2 px-4 text-left text-gray-600">Car</th>
            <th className="py-2 px-4 text-left text-gray-600">Status</th>
            <th className="py-2 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{booking.bookingId}</td>
              <td className="py-2 px-4">{booking.user}</td>
              <td className="py-2 px-4">{booking.car}</td>
              <td className="py-2 px-4">{booking.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleConfirm(booking.id)}
                  className="text-green-500 hover:text-green-700 mr-4"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
