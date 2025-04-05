import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableCars, bookCar } from "../../services/api";

const CarList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });

  useEffect(() => {
    getAvailableCars().then(setCars);
  }, []);

  const handleBookNowClick = (carId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first to book a car.");
      navigate("/login");
    } else {
      setSelectedCar(carId);
    }
  };

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!selectedCar || !dates.start_date || !dates.end_date) {
      alert("Please select booking dates.");
      return;
    }

    await bookCar({ user_id: user.id, car_id: selectedCar, ...dates });
    alert("Car booked successfully!");
    window.location.reload();
  };

  return (
    <section id="cars">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Available Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={car.image_url}
                alt={car.model}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">
                {car.brand} {car.model} ({car.year})
              </h3>
              <p className="text-gray-600">Price per day: ${car.price_per_day}</p>
              <button
                onClick={() => handleBookNowClick(car.id)}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Select Booking Dates</h3>
              <input
                type="date"
                onChange={(e) => setDates({ ...dates, start_date: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <input
                type="date"
                onChange={(e) => setDates({ ...dates, end_date: e.target.value })}
                className="border p-2 w-full mb-4"
              />
              <button
                onClick={handleBooking}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setSelectedCar(null)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarList;