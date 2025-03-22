import axios from "axios";  // ✅ Ensure axios is imported
const token = localStorage.getItem("token")


const API_URL = "http://localhost:5000/api";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAvailableCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars`, getAuthHeaders());
    return response.data.filter(car => car.status === "available");
  } catch (error) {
    console.error("Error fetching available cars:", error);
    return [];
  }
};



// Fetch all cars
export const getAllCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const addCar = async (carData) => {
  console.log("Sending car data to backend:", carData); // 🛠 Debugging line

  try {
    await axios.post(`${API_URL}/cars`, carData, { 
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
    });
  } catch (error) {
    console.error("Error adding car:", error.response?.data || error.message);
  }
};

export const deleteCar = async (carId) => {
  try {
    await axios.delete(`${API_URL}/cars/${carId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  } catch (error) {
    console.error("Error deleting car:", error);
  }
};
export const updateCar = async (carId, carData) => {
  try {
    await axios.put(`${API_URL}/cars/${carId}`, carData, { 
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  } catch (error) {
    console.error("Error updating car:", error);
  }
};
export const bookCar = async (carId, bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, { carId, ...bookingData }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error booking car:", error);
    throw error;
  }
};


