import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import JobDetails from "./pages/JobDetails";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/employer" element={<EmployerDashboard />} />

        <Route path="/candidate" element={<CandidateDashboard />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;