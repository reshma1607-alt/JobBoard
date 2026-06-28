import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState({});
const [resume, setResume] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `https://jobboard-backend-tktq.onrender.com/api/jobs/${id}`
      );

      setJob(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async () => {
  try {

    const formData = new FormData();

    formData.append("candidate", user._id);
    formData.append("job", id);

    if (resume) {
      formData.append("resume", resume);
    }

    const response = await axios.post(
      "https://jobboard-backend-tktq.onrender.com/api/applications/apply",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);

  } catch (error) {

    alert(
      error.response?.data?.message || "Application Failed"
    );

  }
};
  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2>{job.title}</h2>

        <hr />

        <h4>{job.company}</h4>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Salary:</strong> {job.salary}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{job.description}</p>

        <div className="mb-3">

  <label className="form-label">
    Upload Resume (PDF)
  </label>

  <input
    type="file"
    className="form-control"
    accept=".pdf"
    onChange={(e) => setResume(e.target.files[0])}
  />

</div>

<button
  className="btn btn-success"
  onClick={applyJob}
>
  Apply Now
</button>
      </div>

    </div>
  );
}

export default JobDetails;