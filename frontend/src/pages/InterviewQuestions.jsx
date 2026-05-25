import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import { resumeService } from "../services/resumeService";
import { analysisService } from "../services/analysisService";
import { downloadElementAsPdf } from "../utils/pdfExport";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const InterviewQuestions = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [questions, setQuestions] = useState(null);
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
      const response = await analysisService.interviewQuestions({ resumeId, targetRole });
      setQuestions(response.data);
      toast.success("Interview questions generated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Question generation failed");
    } finally {
      setLoading(false);
    }
  };

  const groups = [
    ["Technical Questions", questions?.technicalQuestions],
    ["HR Questions", questions?.hrQuestions],
    ["Project-Based Questions", questions?.projectBasedQuestions]
  ];

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold">Interview Questions</h1>
          <p className="mt-2 text-slate-500">Generate technical, HR, and project-based questions.</p>
        </div>
        {questions && <button className="btn-secondary" onClick={() => downloadElementAsPdf("questions-report")}><FaDownload /> Download PDF</button>}
      </div>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
          <select className="input-field" value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
            {resumes.map((resume) => <option key={resume._id} value={resume._id}>{resume.originalName}</option>)}
          </select>
          <input className="input-field" placeholder="Target role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
          <button className="btn-primary" onClick={handleGenerate} disabled={loading}>{loading ? "Generating..." : "Generate"}</button>
        </div>
      </div>

      <div id="questions-report" className="mt-6 bg-slate-50 p-1 dark:bg-slate-950">
        {loading && <Loader label="Preparing interview questions..." />}
        {!loading && !questions && <EmptyState title="No questions generated" />}
        {questions && (
          <div className="grid gap-5 lg:grid-cols-3">
            {groups.map(([title, items]) => (
              <div key={title} className="glass-panel rounded-xl p-5">
                <h2 className="font-bold">{title}</h2>
                <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {(items || []).map((question) => <li key={question}>{question}</li>)}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;
