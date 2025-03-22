import React, { useState } from "react";
import axios from "axios"; // To make the API request

const AddCar = () => {
  const [carDetails, setCarDetails] = useState({
    rentalId: "",  // rental_id (foreign key to rental or related table)
    model: "",     // model
    brand: "",     // brand
    year: "",      // year
    pricePerDay: "", // price_per_day
    status: "available", // status (default: available)
    imageUrl: "",  // image_url (optional)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/cars", carDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        alert("Car added successfully!");
        // Optionally, redirect the user after successful submission
        window.location.href = "/rental/dashboard"; // Adjust the URL if necessary
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("There was an error adding the car.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Car</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="rentalId" className="block font-semibold">Rental ID</label>
          <input
            type="number"
            id="rentalId"
            name="rentalId"
            value={carDetails.rentalId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block font-semibold">Car Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={carDetails.model}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block font-semibold">Car Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={carDetails.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block font-semibold">Car Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={carDetails.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pricePerDay" className="block font-semibold">Price per Day</label>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={carDetails.pricePerDay}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-semibold">Car Status</label>
          <select
            id="status"
            name="status"
            value={carDetails.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-semibold">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={carDetails.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
