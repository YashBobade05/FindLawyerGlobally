import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import LawyerDashboard from "../pages/LawyerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import SurveyForm from "../components/Survey/SurveyForm";
import MySurvey from "../components/Survey/MySurvey";
import ProtectedRoute from "./ProtectedRoute";
import EditSurvey from "../components/Survey/EditSurvey";
import ForgotPassword from "../components/Auth/ForgotPassword";

export default function AppRoutes() {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

    
      <Route
        path="/lawyer/dashboard"
        element={
          <ProtectedRoute role="lawyer">
            <LawyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lawyer/survey"
        element={
          <ProtectedRoute role="lawyer">
            <SurveyForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lawyer/mysurvey"
        element={
          <ProtectedRoute role="lawyer">
            <MySurvey />
          </ProtectedRoute>
        }
      />

      <Route
        path="/survey/edit"
        element={
          <ProtectedRoute role="lawyer">
            <EditSurvey />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

  
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}
