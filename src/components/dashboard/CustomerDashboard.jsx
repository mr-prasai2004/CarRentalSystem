import React, { useState, useEffect } from "react";
import { Car, User, Calendar, CreditCard, Trash2 } from 'lucide-react';

const CustomerDashboard = () => {
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({ name: "", email: "", phone: "" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await Promise.all([fetchCars(), fetchBookings(), fetchUserProfile()]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cars", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setCars(data);
        } catch (err) {
            console.error("Failed to fetch cars", err);
        }
    };

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('jwtToken');
        console.log('Token:', token);  // Check if token exists
      
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          console.error("Failed to fetch user profile:", response.status);
          throw new Error('Failed to fetch user profile');
        }
      
        const data = await response.json();
        console.log("User profile data:", data);  // Log the data being returned
      
        setUser(data);  // Set the user data
      };

    const fetchBookings = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:5000/api/bookings/mine', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
    
        const data = await response.json();
        setBookings(data);
    };

    const bookCar = async (carId) => {
        try {
            await fetch("http://localhost:5000/api/bookings", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ carId })
            });
            await fetchBookings();
        } catch (error) {
            console.error("Booking failed:", error);
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            await fetchBookings();
        } catch (error) {
            console.error("Cancellation failed:", error);
        }
    };

    const updateProfile = async () => {
  // Ensure the user object is set
  if (!user || !user.id) {
    console.error("User data not found");
    return;
  }

  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:5000/api/user/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Profile update failed');
    }

    const updatedUser = await response.json();
    setUser(updatedUser);  // Update the user state with the updated profile
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Profile update failed:", error);
  }
};

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Cars Section */}
                <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Car className="mr-2 text-blue-600" />
                        Available Cars
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cars.map(car => (
                            <div key={car.id} className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow">
                                {/* Display car image */}
                                <img
                                    src={car.image_url || '/path/to/default/image.jpg'}  // Use default image if URL is missing
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-64 object-cover mb-4 rounded"
                                />
                                <h3 className="font-semibold text-lg mb-2">{car.brand} {car.model}</h3>
                                <p className="text-gray-600 mb-2">{car.year} | ${car.price_per_day}/day</p>
                                {!bookings.some(b => b.car.id === car.id) && (
                                    <button
                                        onClick={() => bookCar(car.id)}
                                        className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="mr-2 text-green-600" />
                        My Profile
                    </h2>
                    <div className="space-y-4">
                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Name"
                            value={user.name || ""}  // Make sure it's not null, use an empty string
                            onChange={e => setUser({ ...user, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            placeholder="Email"
                            value={user.email || ""}  // Ensure it's not null
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Phone"
                            value={user.phone || ""}  // Ensure it's not null
                            onChange={e => setUser({ ...user, phone: e.target.value })}
                        />
                        <button
                            onClick={updateProfile}
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>

                {/* My Bookings Section */}
                <div className="md:col-span-3 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Calendar className="mr-2 text-purple-600" />
                        My Bookings
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map(booking => (
                            <div key={booking.id} className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow">
                                <h3 className="font-semibold text-lg mb-2">
                                    {booking.car.brand} {booking.car.model}
                                </h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <CreditCard className="mr-2 w-4 h-4" />
                                    {booking.start_date} to {booking.end_date}
                                </div>
                                <button
                                    onClick={() => cancelBooking(booking.id)}
                                    className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="mr-2 inline" /> Cancel Booking
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
