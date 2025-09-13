import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import styles from "./MySurvey.module.css";

export default function MySurvey() {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/survey/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSurvey(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, []);

  if (loading) return <p className={styles.loading}>Loading your survey...</p>;

  if (!survey) {
    return <p className={styles.noSurvey}>⚠️ You haven’t submitted any survey yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📄 My Submitted Survey</h2>

      <div className={styles.infoCard}>
        <p><strong>Name:</strong> {survey.user?.name}</p>
        <p><strong>Email:</strong> {survey.user?.email}</p>
        <p><strong>Years of Experience:</strong> {survey.yearsOfExperience}</p>
        <p><strong>Specialization:</strong> {survey.specialization}</p>
        <p><strong>Location:</strong> {survey.location}</p>
      </div>

      <h3 className={styles.subtitle}>📝 Answers</h3>
      <div className={styles.answers}>
        {survey.answers.map((a, i) => (
          <div key={i} className={styles.answerBlock}>
            <p className={styles.question}>{a.question}</p>
            <p className={styles.answer}>{a.answer}</p>
          </div>
        ))}
      </div>


      <div className={styles.actions}>
        <button onClick={() => navigate("/lawyer/dashboard")} className={styles.backBtn}>
          ⬅ Back
        </button>
        <button
          onClick={() => navigate("/survey/edit")}
          className={styles.editBtn}
        >
          ✏️ Edit Survey
        </button>
      </div>
    </div>
  );
}
