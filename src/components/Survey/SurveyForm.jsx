import { useState, useEffect } from "react";
import API from "../../utils/api"; 
import styles from "./SurveyForm.module.css";
import { useNavigate } from "react-router-dom";

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    specialization: "",
    location: "",
    answers: [],
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
          setSubmitted(true); 
        }
      } catch (err) {
        console.log("No existing survey found");
      }
    };
    fetchSurvey();
  }, []);

   
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/lawyer/dashboard");
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [submitted, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = {
      question: questions[index],
      answer: value,
    };
    setFormData({ ...formData, answers: updatedAnswers });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.post("/survey/submit", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Survey submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit survey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lawyer Survey Form</h2>

      {submitted ? (
        <p className={styles.success}>✅ You have already submitted the survey. Redirecting to dashboard...</p>
      ) : (
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

     
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Submitting..." : "Submit Survey"}
          </button>
        </form>
      )}
    </div>
  );
}
