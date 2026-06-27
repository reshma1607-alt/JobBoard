import React from "react";

function CandidateDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">

      <h1>Candidate Dashboard</h1>

      <hr />

      <div className="card p-4 shadow">

        <h3>Welcome {user?.name}</h3>

        <p>Email : {user?.email}</p>

        <p>Role : {user?.role}</p>

      </div>

    </div>
  );
}

export default CandidateDashboard;