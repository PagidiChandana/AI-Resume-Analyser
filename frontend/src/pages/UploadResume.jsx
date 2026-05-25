import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCloudArrowUp, FaFilePdf } from "react-icons/fa6";
import { resumeService } from "../services/resumeService";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!allowedTypes.includes(selectedFile.type)) return toast.error("Upload a PDF, DOC, or DOCX file");
    if (selectedFile.size > 5 * 1024 * 1024) return toast.error("File must be below 5MB");
    setFile(selectedFile);
    setUploadedResume(null);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Choose a resume first");
    try {
      const response = await resumeService.uploadResume(file, (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      });
      setUploadedResume(response.data.resume);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-extrabold">Upload Resume</h1>
      <p className="mt-2 text-slate-500">Drag and drop a PDF, DOC, or DOCX file to store it securely in Cloudinary.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            selectFile(event.dataTransfer.files[0]);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`glass-panel grid min-h-80 place-items-center rounded-xl border-2 border-dashed p-8 text-center transition ${
            dragging ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30" : ""
          }`}
        >
          <div>
            <FaCloudArrowUp className="mx-auto text-6xl text-cyan-500" />
            <h2 className="mt-4 text-xl font-bold">{file ? file.name : "Drop your resume here"}</h2>
            <p className="mt-2 text-sm text-slate-500">Maximum file size: 5MB</p>
            <input ref={inputRef} className="hidden" type="file" accept=".pdf,.doc,.docx" onChange={(e) => selectFile(e.target.files[0])} />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="btn-secondary" onClick={() => inputRef.current?.click()}>Choose File</button>
              <button className="btn-primary" onClick={handleUpload}>Upload Resume</button>
            </div>
            {progress > 0 && (
              <div className="mt-5">
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-slate-500">{progress}% uploaded</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center gap-3">
            <FaFilePdf className="text-2xl text-rose-500" />
            <h2 className="font-bold">Preview</h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border bg-white dark:bg-slate-900">
            {file?.type === "application/pdf" ? (
              <iframe title="PDF preview" src={URL.createObjectURL(file)} className="h-96 w-full" />
            ) : (
              <div className="grid h-96 place-items-center p-6 text-center text-sm text-slate-500">
                Preview is available for PDFs. DOC and DOCX files can still be uploaded and analyzed.
              </div>
            )}
          </div>
          {uploadedResume && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
              Upload complete. <Link className="font-bold underline" to="/analysis">Analyze this resume</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
