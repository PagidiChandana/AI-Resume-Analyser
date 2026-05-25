import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload, FaEnvelope } from "react-icons/fa6";
import ResumeScore from "../components/ResumeScore";
import FeedbackCards from "../components/FeedbackCards";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { resumeService } from "../services/resumeService";
import { analysisService } from "../services/analysisService";
import { downloadElementAsPdf } from "../utils/pdfExport";

const Analysis = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const response = await resumeService.getResumes();
        const userResumes = response.data.resumes || [];
        setResumes(userResumes);
        setResumeId(userResumes[0]?._id || "");
      } finally {
        setFetching(false);
      }
    };
    loadResumes();
  }, []);

  const handleAnalyze = async () => {
    if (!resumeId) return toast.error("Upload or select a resume first");
    setLoading(true);
    try {
      const response = await analysisService.analyzeResume({ resumeId, targetRole, jobDescription, sendEmail });
      setAnalysis(response.data.analysis);
      toast.success(sendEmail ? "Analysis completed and email sent" : "Analysis completed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader label="Loading resumes..." />;

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-extrabold">AI Resume Analysis</h1>
          <p className="mt-2 text-slate-500">Generate ATS score, feedback, strengths, weaknesses, and suggestions.</p>
        </div>
        {analysis && (
          <button className="btn-secondary" onClick={() => downloadElementAsPdf("analysis-report")}>
            <FaDownload /> Download PDF
          </button>
        )}
      </div>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
          <select className="input-field" value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
            {resumes.map((resume) => (
              <option key={resume._id} value={resume._id}>{resume.originalName}</option>
            ))}
          </select>
          <input className="input-field" placeholder="Target role, e.g. Full Stack Developer" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
          <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</button>
        </div>
        <div className="mt-4">
          <textarea
            className="input-field w-full min-h-[100px] resize-y py-2.5 px-4"
            placeholder="Paste Job Description here to get a hyper-targeted ATS compatibility score (Optional)..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} />
          <FaEnvelope className="text-cyan-500" /> Email report after analysis
        </label>
      </div>

      <div id="analysis-report" className="mt-6 grid gap-6 bg-slate-50 p-1 dark:bg-slate-950">
        {loading && <Loader label="Gemini is reviewing your resume..." />}
        {!loading && !analysis && <EmptyState title="No analysis yet" message="Select a resume and start analysis to generate a complete report." />}
        {analysis && (
          <>
            <ResumeScore score={analysis.atsScore} breakdown={analysis.atsBreakdown} />
            <div className="glass-panel rounded-xl p-5">
              <h2 className="font-bold">Resume Feedback</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
                  <p className="text-sm font-bold">Quality</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{analysis.resumeQuality || "No quality feedback available."}</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
                  <p className="text-sm font-bold">ATS Compatibility</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{analysis.atsCompatibility || "No ATS feedback available."}</p>
                </div>
              </div>
            </div>
            <FeedbackCards analysis={analysis} />
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;
