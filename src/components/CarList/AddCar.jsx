import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  Car, ChevronLeft, Upload, CheckCircle,
  AlertCircle, DollarSign, Calendar, Tag, 
  Settings, Image
} from "lucide-react";

const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [carDetails, setCarDetails] = useState({
    rentalId: "",
    model: "",
    brand: "",
    year: "",
    pricePerDay: "",
    status: "available",
    imageUrl: "",
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
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/cars", carDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/rental/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      setError("There was an error adding the car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              to="/rental/dashboard" 
              className="flex items-center text-gray-600 hover:text-blue-600 mb-2 transition-colors duration-200"
            >
              <ChevronLeft size={18} className="mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Add New Car</h1>
            <p className="text-gray-500 mt-1">Enter the details of the new vehicle</p>
          </div>
          <div className="bg-blue-500 p-3 rounded-full shadow-lg">
            <Car size={28} className="text-white" />
          </div>
        </div>

        {/* Success message */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow flex items-center">
            <CheckCircle size={20} className="mr-2" />
            <span>Car added successfully! Redirecting to dashboard...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Vehicle Information</h2>
            <p className="text-gray-500 text-sm">All fields marked with * are required</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="rentalId" className="block text-sm font-medium text-gray-700 mb-1">
                  Rental ID*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Tag size={18} />
                  </span>
                  <input
                    type="number"
                    id="rentalId"
                    name="rentalId"
                    value={carDetails.rentalId}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    required
                    placeholder="Enter rental ID"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Brand*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Car size={18} />
                  </span>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={carDetails.brand}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    required
                    placeholder="e.g., Toyota, Honda"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Model*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Car size={18} />
                  </span>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={carDetails.model}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    required
                    placeholder="e.g., Camry, Civic"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturing Year*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Calendar size={18} />
                  </span>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    min="1900"
                    max="2030"
                    value={carDetails.year}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    required
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Day*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <DollarSign size={18} />
                  </span>
                  <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    min="0"
                    step="0.01"
                    value={carDetails.pricePerDay}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    required
                    placeholder="e.g., 50.00"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Status*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Settings size={18} />
                  </span>
                  <select
                    id="status"
                    name="status"
                    value={carDetails.status}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 appearance-none"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Image size={18} />
                  </span>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={carDetails.imageUrl}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="https://example.com/car-image.jpg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a valid URL for the car image. Leave blank if not available.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                to="/rental/dashboard"
                className="mr-4 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload size={18} className="mr-2" />
                    Add Car
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;