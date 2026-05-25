import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import HistoryReport from "./pages/HistoryReport";
import SkillGap from "./pages/SkillGap";
import JobRecommendations from "./pages/JobRecommendations";
import InterviewQuestions from "./pages/InterviewQuestions";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<HistoryReport />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/jobs" element={<JobRecommendations />} />
        <Route path="/interview" element={<InterviewQuestions />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
