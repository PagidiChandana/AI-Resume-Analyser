import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resumeService } from "../services/resumeService";
import { analysisService } from "../services/analysisService";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

const SkillGap = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeService.getResumes().then((response) => {
      const items = response.data.resumes || [];
      setResumes(items);
      setResumeId(items[0]?._id || "");
    });
  }, []);

  const handleSubmit = async () => {
    if (!resumeId || !targetRole) return toast.error("Select resume and enter target role");
    setLoading(true);
    try {
      const response = await analysisService.skillGap({ resumeId, targetRole });
      setResult(response.data.skillGap);
      toast.success("Skill gap analysis completed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Skill gap analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    ["Current Skills", result?.currentSkills],
    ["Missing Skills", result?.missingSkills],
    ["Recommended Skills", result?.recommendedSkills],
    ["Learning Suggestions", result?.learningSuggestions]
  ];

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-extrabold">Skill Gap Analysis</h1>
      <p className="mt-2 text-slate-500">Compare your resume skills with a target job role.</p>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <select className="input-field" value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
            {resumes.map((resume) => <option key={resume._id} value={resume._id}>{resume.originalName}</option>)}
          </select>
          <input className="input-field" placeholder="Target role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Analyzing..." : "Analyze Gap"}</button>
        </div>
      </div>

      <div className="mt-6">
        {loading && <Loader label="Finding missing skills..." />}
        {!loading && !result && <EmptyState title="No skill gap report" message="Enter a target role to see missing and recommended skills." />}
        {result && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {columns.map(([title, items]) => (
              <div key={title} className="glass-panel rounded-xl p-5">
                <h2 className="font-bold">{title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(items || []).map((item) => (
                    <span key={item} className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGap;
