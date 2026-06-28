import { Link } from "react-router-dom";

function Home() {

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Hyderabad",
      salary: "₹15 LPA",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Microsoft",
      location: "Bangalore",
      salary: "₹12 LPA",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Deloitte",
      location: "Chennai",
      salary: "₹10 LPA",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Find Your Dream Job</h1>

          <p className="lead">
            Search thousands of jobs from top companies.
          </p>

          <div className="row justify-content-center mt-4">

            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search jobs..."
              />
            </div>

            <div className="col-md-2 mt-2 mt-md-0">
              <button className="btn btn-warning btn-lg w-100">
                Search
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Categories */}
      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Popular Categories
        </h2>

        <div className="row text-center">

          <div className="col-md-3 mb-3">
            <div className="card shadow p-3">
              💻
              <h5>Software Developer</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow p-3">
              📊
              <h5>Data Analyst</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow p-3">
              🎨
              <h5>UI/UX Designer</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow p-3">
              ☁️
              <h5>Cloud Engineer</h5>
            </div>
          </div>

        </div>

      </div>

      {/* Featured Jobs */}
      <div className="container mt-5 mb-5">

        <h2 className="text-center mb-4">
          Featured Jobs
        </h2>

        <div className="row">

          {jobs.map((job) => (

            <div className="col-md-4 mb-4" key={job.id}>

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>{job.title}</h4>

                  <h6>{job.company}</h6>

                  <p>📍 {job.location}</p>

                  <p className="fw-bold text-success">
                    {job.salary}
                  </p>

                  <Link
                    to={`/job/${job.id}`}
                    className="btn btn-success w-100"
                  >
                    Apply Now
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Home;