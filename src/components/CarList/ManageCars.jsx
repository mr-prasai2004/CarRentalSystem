import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCars, addCar, updateCar, deleteCar } from "../../services/api";

const ManageCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({
    model: "",
    brand: "",
    year: "",
    price_per_day: "",
    status: "available",
    image_url: "",
  });
  const [editingCar, setEditingCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const handleChange = (e) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value });
    setFormError("");
  };

  const validateForm = () => {
    if (!carForm.model || !carForm.brand || !carForm.year || !carForm.price_per_day) {
      setFormError("Please fill all required fields");
      return false;
    }
    if (isNaN(carForm.year) || carForm.year < 1900 || carForm.year > new Date().getFullYear() + 1) {
      setFormError("Please enter a valid year");
      return false;
    }
    if (isNaN(carForm.price_per_day) || carForm.price_per_day <= 0) {
      setFormError("Please enter a valid price");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
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
    } catch (error) {
      console.error("Error saving car:", error);
      setFormError("Failed to save car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (car) => {
    setCarForm(car);
    setEditingCar(car.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        fetchCars();
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const resetForm = () => {
    setCarForm({
      model: "",
      brand: "",
      year: "",
      price_per_day: "",
      status: "available",
      image_url: "",
    });
    setEditingCar(null);
    setFormError("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingCar ? "Edit Car Details" : "Add New Car"}
            </h2>
          </div>
          <div className="p-6">
            {formError && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                <p>{formError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={carForm.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Toyota"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={carForm.model}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Camry"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={carForm.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 2023"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    name="price_per_day"
                    value={carForm.price_per_day}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 75"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={carForm.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={carForm.image_url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/car-image.jpg"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end space-x-3">
                {editingCar && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white ${
                    editingCar ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    editingCar ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingCar ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    <span>{editingCar ? "Update Car" : "Add Car"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Car List */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Car Inventory</h2>
          <p className="text-gray-500">Manage your fleet of {cars.length} vehicles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 ? (
            <div className="col-span-3 bg-white p-8 rounded-lg shadow-md text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <p className="mt-4 text-lg text-gray-600">No cars in inventory</p>
              <p className="text-gray-500">Add your first car to get started</p>
            </div>
          ) : (
            cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image_url} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                  <span 
                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(car.status)}`}
                  >
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-gray-600">{car.year}</span>
                    <span className="font-medium text-green-600">${parseFloat(car.price_per_day).toFixed(2)}/day</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCars;