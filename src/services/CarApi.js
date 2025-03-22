import axios from 'axios';

const carApi = {
  addCar: (carDetails) => {
    return axios.post('http://localhost:5000/api/cars/add', carDetails);
  },

  // More API methods (get, update, delete) can go here
};
const updateCar = async (carData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/cars/${carData.id}`, carData);
    console.log("Car updated successfully!", response.data);
  } catch (error) {
    console.error("Error updating car:", error.response ? error.response.data : error.message);
  }
};


export default carApi;
