import React, { useState } from "react";

const AddCar = () => {
  const [car, setCar] = useState({
    name: "",
    model: "",
    year: "",
    rentPrice: "",
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car Added:", car);
    alert("Car added successfully!");
    setCar({ name: "", model: "", year: "", rentPrice: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <label className="block mb-2">
          Car Name:
          <input type="text" name="name" value={car.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>
        <label className="block mb-2">
          Model:
          <input type="text" name="model" value={car.model} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>
        <label className="block mb-2">
          Year:
          <input type="number" name="year" value={car.year} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>
        <label className="block mb-2">
          Rent Price ($/day):
          <input type="number" name="rentPrice" value={car.rentPrice} onChange={handleChange} className="w-full p-2 border rounded" required />
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
