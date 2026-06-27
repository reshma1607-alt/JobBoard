import { useEffect, useState } from "react";
import axios from "axios";
function EmployerDashboard() {
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    employer: JSON.parse(localStorage.getItem("user"))?._id,
  });
  useEffect(() => {
    fetchApplications();
  }, []);
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applications"
      );
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const postJob = async (e) => {
    e.preventDefault();
    console.log(job);

    try {
      const response = await axios.post(
  "http://localhost:5000/api/jobs/create",
  job
);

      alert(response.data.message);

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        employer: JSON.parse(localStorage.getItem("user"))?._id,
      });

    } catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}
  };
  console.log("User:", JSON.parse(localStorage.getItem("user")));
console.log("Job:", job);

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Employer Dashboard</h2>

      {/* Post Job */}

      <div className="card shadow p-4 mb-5">

        <h4 className="mb-3">Post New Job</h4>

        <form onSubmit={postJob}>

          <input
            className="form-control mb-3"
            placeholder="Job Title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Company"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Location"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />

          <button className="btn btn-success">
            Post Job
          </button>

        </form>

      </div>

      {/* Applications */}

      <div className="card shadow p-4">

        <h4 className="mb-3">Job Applications</h4>

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>

            {applications.map((app) => (

              <tr key={app._id}>
                <td>{app.candidate?.name}</td>
                <td>{app.candidate?.email}</td>
                <td>{app.job?.title}</td>
                <td>{app.job?.company}</td>
                <td>{app.status}</td>

                <td>
                  {app.resume ? (
                    <a
                      href={`http://localhost:5000/uploads/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Download Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployerDashboard;