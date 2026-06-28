import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (keyword = "") => {

    try {

      const response = await axios.get(
        `http://https://jobboard-backend-tktq.onrender.com/api/jobs?search=${keyword}`
      );

      setJobs(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Available Jobs
      </h2>

      <div className="row mb-4">

        <div className="col-md-10">

          <input
            type="text"
            className="form-control"
            placeholder="Search by Title, Company or Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-2">

          <button
            className="btn btn-primary w-100"
            onClick={() => fetchJobs(search)}
          >
            Search
          </button>

        </div>

      </div>

      <div className="row">

        {jobs.map((job) => (

          <div
            className="col-md-6 mb-4"
            key={job._id}
          >

            <div className="card shadow p-3">

              <h4>{job.title}</h4>

              <h5>{job.company}</h5>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <p>{job.description}</p>

              <Link
                to={`/job/${job._id}`}
                className="btn btn-primary"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Jobs;