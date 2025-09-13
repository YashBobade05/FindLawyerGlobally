import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/api";
import styles from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("lawyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.heading}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.input}
          >
            <option value="lawyer">Lawyer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
