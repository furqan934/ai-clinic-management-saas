import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/login_page";

import RegisterPage from "./pages/auth/register_page";

import AdminDashboard from "./pages/admin/admin_dashboard";

import DoctorDashboard from "./pages/doctor/doctor_dashboard";

import PatientDashboard from "./pages/patient/patient_dashboard";

import ReceptionistDashboard from "./pages/receptionist/receptionist_dashboard";

import DashboardLayout from "./layouts/dashboard_layout";

import  PatientsPage from "./pages/admin/patients_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route path="/patient" element={<PatientDashboard />} />

          <Route path="/receptionist" element={<ReceptionistDashboard />} />

          <Route path="/admin/patients" element={<PatientsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
