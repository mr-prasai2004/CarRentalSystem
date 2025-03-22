import React, { useEffect, useState } from "react";
import { getAllCars, addCar, updateCar, deleteCar } from "../../services/api";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({
    model: "",
    brand: "",
    year: "",
    price_per_day: "",
    status: "available",
    image_url: "",
  });
  const [editingCar, setEditingCar] = useState(null); // Track the car being edited

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const data = await getAllCars();
    setCars(data);
  };

  const handleChange = (e) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting car data:", carForm); // 🛠 Debugging log
    
    if (editingCar) {
      await updateCar(editingCar, carForm);
    } else {
      await addCar(carForm);
    }
  
    fetchCars();
    setEditingCar(null);
    setCarForm({
      model: "",
      brand: "",
      year: "",
      price_per_day: "",
      status: "available",
      image_url: "",
    });
  };
  

  const handleEdit = (car) => {
    setCarForm(car);
    setEditingCar(car.id);
  };

  const handleDelete = async (id) => {
    await deleteCar(id);
    fetchCars();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {editingCar ? "Edit Car" : "Add Car"}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={carForm.model}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={carForm.brand}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={carForm.year}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          name="price_per_day"
          placeholder="Price per day"
          value={carForm.price_per_day}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={carForm.image_url}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <select
          name="status"
          value={carForm.status}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          {editingCar ? "Update Car" : "Add Car"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={car.image_url} alt={car.model} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">
              {car.brand} {car.model} ({car.year})
            </h3>
            <p className="text-gray-600">Price per day: ${car.price_per_day}</p>
            <p className="text-gray-500">Status: {car.status}</p>
            <button
              onClick={() => handleEdit(car)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car.id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;