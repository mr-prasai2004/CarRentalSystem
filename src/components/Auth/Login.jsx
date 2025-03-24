import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json(); // ✅ Call `response.json()` only once

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      localStorage.setItem("token", data.token);
      alert("Login Successful!");

      // ✅ Decode JWT token and extract the role
      try {
        const decodedToken = jwtDecode(data.token);
        console.log("Decoded Token:", decodedToken); // Debugging purpose

        const userRole = decodedToken.role; // ✅ Ensure backend includes `role`

        // ✅ Redirect based on role
        if (userRole === "admin") {
          navigate("/adminDashboard");
        } else if (userRole === "rental") {
          navigate("/rentalDashboard");
        } else {
          navigate("/customerDashboard");
        }
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        navigate("/customer-dashboard"); // Default fallback
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Signup link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
