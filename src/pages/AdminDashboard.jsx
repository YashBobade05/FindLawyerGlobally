import { useState, useEffect } from "react";
import API from "../utils/api"; 
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    specialization: "",
    location: "",
    minExp: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/survey", {
        headers: { Authorization: `Bearer ${token}` },
        params: Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== "")
        ),
      });
      console.log("Surveys response:", res.data);
      setSurveys(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/survey/export", {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters, format: "csv" },
        responseType: "blob",
      });
                                                                             // Export CSV
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "surveys.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  
const handleExportPDF = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/survey/export", {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...filters, format: "pdf" },
      responseType: "blob",
    });
                                                                                 // Export PDF
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "surveys.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

 
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Specialization"
          value={filters.specialization}
          onChange={(e) =>
            setFilters({ ...filters, specialization: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Experience"
          value={filters.minExp}
          onChange={(e) => setFilters({ ...filters, minExp: e.target.value })}
        />
        <button onClick={fetchSurveys} className={styles.button}>
          Apply
        </button>
        <button onClick={handleExport} className={styles.buttonSecondary}>
          Export CSV
        </button>
         <button onClick={handleExportPDF} className={styles.buttonSecondary}>
    Export PDF
  </button>
      </div>


      {loading ? (
        <p>Loading surveys...</p>
      ) : surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Specialization</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => (
                <tr key={s._id}>
                  <td>{s.user?.name}</td>
                  <td>{s.user?.email}</td>
                  <td>{s.yearsOfExperience}</td>
                  <td>{s.specialization}</td>
                  <td>{s.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
    </div>
  );
}
