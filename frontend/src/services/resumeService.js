import api from "./api";

export const resumeService = {
  uploadResume: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append("resume", file);

    const { data } = await api.post("/upload/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress
    });
    return data;
  },
  getResumes: async () => {
    const { data } = await api.get("/upload/resumes");
    return data;
  },
  getHistory: async () => {
    const { data } = await api.get("/history");
    return data;
  },
  compareScores: async () => {
    const { data } = await api.get("/history/compare");
    return data;
  },
  getHistoryReport: async (id) => {
    const { data } = await api.get(`/history/${id}`);
    return data;
  }
};
