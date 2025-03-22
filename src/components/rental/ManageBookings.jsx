import React, { useState } from "react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, car: "Toyota Camry", customer: "Emily Johnson", startDate: "2024-03-05", endDate: "2024-03-10" },
    { id: 2, car: "Honda Civic", customer: "Michael Smith", startDate: "2024-03-03", endDate: "2024-03-08" },
  ]);

  const handleCancel = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    alert("Booking cancelled successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Car</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id} className="border-t">
              <td className="p-2">{booking.car}</td>
              <td className="p-2">{booking.customer}</td>
              <td className="p-2">{booking.startDate}</td>
              <td className="p-2">{booking.endDate}</td>
              <td className="p-2">
                <button onClick={() => handleCancel(booking.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
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

export default ManageBookings;
