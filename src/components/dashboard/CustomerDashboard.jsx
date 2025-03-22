import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDashboard = () => {
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        fetchCars();
        fetchBookings();
        fetchUserProfile();
    }, []);

    const fetchCars = async () => {
        const response = await axios.get("http://localhost:5000/api/cars/available");
        setCars(response.data);
    };

    const fetchBookings = async () => {
        const response = await axios.get("http://localhost:5000/api/bookings/mine", { withCredentials: true });
        setBookings(response.data);
    };

    const fetchUserProfile = async () => {
        const response = await axios.get("http://localhost:5000/api/user/profile", { withCredentials: true });
        setUser(response.data);
    };

    const bookCar = async (carId) => {
        await axios.post("http://localhost:5000/api/bookings", { carId }, { withCredentials: true });
        fetchBookings();
    };

    const cancelBooking = async (bookingId) => {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { withCredentials: true });
        fetchBookings();
    };

    const updateProfile = async () => {
        await axios.put("http://localhost:5000/api/user/profile", user, { withCredentials: true });
        fetchUserProfile();
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Customer Dashboard</h1>
            
            {/* Car Booking Section */}
            <h2 className="mt-4 text-lg font-semibold">Available Cars</h2>
            <div className="grid grid-cols-3 gap-4">
                {cars.map(car => (
                    <div key={car.id} className="border p-4 rounded">
                        <h3>{car.brand} {car.model} ({car.year})</h3>
                        <p>Price: ${car.price_per_day}/day</p>
                        <button onClick={() => bookCar(car.id)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Book</button>
                    </div>
                ))}
            </div>

            {/* My Bookings Section */}
            <h2 className="mt-6 text-lg font-semibold">My Bookings</h2>
            <div className="grid grid-cols-2 gap-4">
                {bookings.map(booking => (
                    <div key={booking.id} className="border p-4 rounded">
                        <h3>{booking.car.brand} {booking.car.model}</h3>
                        <p>Booked from: {booking.start_date} to {booking.end_date}</p>
                        <button onClick={() => cancelBooking(booking.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                ))}
            </div>

            {/* Profile Section */}
            <h2 className="mt-6 text-lg font-semibold">Profile</h2>
            <div className="border p-4 rounded">
                <input type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} className="border p-2 w-full" />
                <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className="border p-2 w-full mt-2" />
                <input type="text" placeholder="Phone" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} className="border p-2 w-full mt-2" />
                <button onClick={updateProfile} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Update Profile</button>
            </div>
        </div>
    );
};

export default CustomerDashboard;