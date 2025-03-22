import React, { useState } from "react";

const ManageCars = () => {
  const [cars, setCars] = useState([
    { id: 1, name: "Toyota Camry", model: "2020", rentPrice: 50 },
    { id: 2, name: "Honda Civic", model: "2019", rentPrice: 40 },
  ]);

  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));
    alert("Car deleted successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Cars</h1>
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Model</th>
            <th className="p-2">Rent Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id} className="border-t">
              <td className="p-2">{car.name}</td>
              <td className="p-2">{car.model}</td>
              <td className="p-2">${car.rentPrice}/day</td>
              <td className="p-2">
                <button onClick={() => handleDelete(car.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCars;
