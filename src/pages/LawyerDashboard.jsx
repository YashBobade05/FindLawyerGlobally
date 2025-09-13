import { Link, useNavigate } from "react-router-dom";
import styles from "./LawyerDashboard.module.css";

export default function LawyerDashboard() {
  const userName = localStorage.getItem("name") || "Lawyer";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome, {userName}!</h1>
      <p className={styles.subtitle}>Manage your survey and profile below:</p>

      <div className={styles.actions}>
        <Link to="/lawyer/survey" className={styles.button}>
          Submit Survey
        </Link>
        <Link to="/lawyer/mysurvey" className={styles.buttonSecondary}>
          View My Survey
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
