import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import styles from "./EditSurvey.module.css";

export default function EditSurvey() {
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    specialization: "",
    location: "",
    answers: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const questions = [
    "What is your preferred area of law?",
    "Have you handled international cases?",
    "How many cases have you handled?",
    "Why do you want to join our platform?",
  ];

  
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/survey/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.error(err);
        alert("No existing survey found. Please submit first.");
        navigate("/survey");
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = { question: questions[index], answer: value };
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.put("/survey/edit", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Survey updated successfully!");
      navigate("/lawyer/mysurvey");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update survey.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading survey...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✏️ Edit Your Survey</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Years of Experience</label>
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
        />

        <label>Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {questions.map((q, i) => (
          <div key={i} className={styles.questionBlock}>
            <label>{q}</label>
            <input
              type="text"
              value={formData.answers[i]?.answer || ""}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              required
            />
          </div>
        ))}

        <div className={styles.actions}>
          <button type="button" onClick={() => navigate("/lawyer/mysurvey")} className={styles.cancelBtn}>
            ❌ Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
