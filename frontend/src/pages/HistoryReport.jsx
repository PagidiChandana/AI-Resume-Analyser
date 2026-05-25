import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ResumeScore from "../components/ResumeScore";
import FeedbackCards from "../components/FeedbackCards";
import { resumeService } from "../services/resumeService";
import { downloadElementAsPdf } from "../utils/pdfExport";

const HistoryReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const response = await resumeService.getHistoryReport(id);
        setReport(response.data.report);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [id]);

  if (loading) return <Loader label="Loading report..." />;
  if (!report) return <EmptyState title="Report not found" />;

  const analysis = report.analysis;

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold">Analysis Report</h1>
          <p className="mt-2 text-slate-500">{report.resume?.originalName}</p>
        </div>
        <button className="btn-secondary" onClick={() => downloadElementAsPdf("history-report")}>
          <FaDownload /> Download PDF
        </button>
      </div>
      <div id="history-report" className="mt-6 grid gap-6 bg-slate-50 p-1 dark:bg-slate-950">
        <ResumeScore score={analysis?.atsScore} breakdown={analysis?.atsBreakdown} />
        <FeedbackCards analysis={analysis} />
      </div>
    </div>
  );
};

export default HistoryReport;
