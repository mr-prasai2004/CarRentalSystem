import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import BookingsPage from "./components/BookingsPage"; // Assuming you have this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<BookingsPage />} /> {/* Add this route */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
