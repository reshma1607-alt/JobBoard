import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
        "http://localhost:5000/api/users/login",
        user
      );

      alert(response.data.message);

localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

const role = response.data.user.role;

if (role === "Employer") {
  navigate("/employer");
} else {
  navigate("/candidate");
}

setUser({
  email: "",
  password: "",
});

    }catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              required
            />
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

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;