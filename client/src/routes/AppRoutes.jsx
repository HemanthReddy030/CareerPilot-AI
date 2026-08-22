import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resume from "../pages/Resume/Resume";
import Jobs from "../pages/Jobs/Jobs";
import Calendar from "../pages/Calendar/Calendar";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import AIInterview from "../pages/AIInterview/AIInterview";
import Gmail from "../pages/Gmail/Gmail";
import CompanyDetails from "../pages/Company/CompanyDetails";
import VerifyEmail from "../pages/Auth/VerifyEmail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<Resume />} />
        <Route
          path="/company/:company"
          element={<CompanyDetails />}
        />

        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/ai-interview"
          element={<AIInterview />}
        />

        <Route
          path="/gmail"
          element={<Gmail />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;