import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Candidate",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
  "https://jobboard-backend-tktq.onrender.com/api/users/register",
  user
);
      

      alert(response.data.message);

      setUser({
        name: "",
        email: "",
        password: "",
        role: "Candidate",
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Role</label>

            <select
              className="form-select"
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option>Candidate</option>
              <option>Employer</option>
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
            />

            <label className="form-check-label">
              Show Password
            </label>
          </div>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
export default Register;