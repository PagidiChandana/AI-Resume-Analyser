import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { resumeService } from "../services/resumeService";
import { analysisService } from "../services/analysisService";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

const colors = ["#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

const JobRecommendations = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeService.getResumes().then((response) => {
      const items = response.data.resumes || [];
      setResumes(items);
      setResumeId(items[0]?._id || "");
    });
  }, []);

  const handleGenerate = async () => {
    if (!resumeId) return toast.error("Select a resume first");
    setLoading(true);
    try {
      const response = await analysisService.jobRecommendations({ resumeId });
      setJobs(response.data.jobs || []);
      toast.success("Job recommendations generated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not generate jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-extrabold">Job Recommendations</h1>
      <p className="mt-2 text-slate-500">Discover roles aligned with your resume skills.</p>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <select className="input-field" value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
            {resumes.map((resume) => <option key={resume._id} value={resume._id}>{resume.originalName}</option>)}
          </select>
          <button className="btn-primary" onClick={handleGenerate} disabled={loading}>{loading ? "Generating..." : "Generate Jobs"}</button>
        </div>
      </div>

      {loading && <Loader label="Matching suitable jobs..." />}
      {!loading && !jobs.length && <div className="mt-6"><EmptyState title="No recommendations yet" /></div>}
      {!!jobs.length && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel rounded-xl p-5">
            <h2 className="font-bold">Suitability Mix</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={jobs} dataKey="suitabilityPercentage" nameKey="jobTitle" outerRadius={105} label>
                    {jobs.map((job, index) => <Cell key={job.jobTitle} fill={colors[index % colors.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.jobTitle} className="glass-panel rounded-xl p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <h3 className="font-bold">{job.jobTitle}</h3>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">
                    {job.suitabilityPercentage}% match
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(job.requiredSkills || []).map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-900">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;
