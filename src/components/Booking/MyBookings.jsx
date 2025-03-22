import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = 1; // Replace with logged-in user's ID

  useEffect(() => {
    getUserBookings(userId).then(setBookings);
  }, [userId]);

  const handleCancel = async (bookingId, carId) => {
    await cancelBooking(bookingId, carId);
    alert("Booking cancelled successfully!");
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">
                {booking.brand} {booking.model} ({booking.year})
              </h3>
              <p>Price per day: ${booking.price_per_day}</p>
              <p>From: {booking.start_date}</p>
              <p>To: {booking.end_date}</p>
              <button
                onClick={() => handleCancel(booking.id, booking.car_id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
