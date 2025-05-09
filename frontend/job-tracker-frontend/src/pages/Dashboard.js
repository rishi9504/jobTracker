import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const Dashboard = () => {
  const { authTokens } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:8000/api/jobs/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, [authTokens]);
  console.log(jobs);
  

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.position}</strong> @ {job.company_name} - {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
