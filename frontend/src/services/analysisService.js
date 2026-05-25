import api from "./api";

export const analysisService = {
  analyzeResume: async (payload) => {
    const { data } = await api.post("/analysis", payload);
    return data;
  },
  getAnalysis: async (id) => {
    const { data } = await api.get(`/analysis/${id}`);
    return data;
  },
  skillGap: async (payload) => {
    const { data } = await api.post("/analysis/skill-gap", payload);
    return data;
  },
  jobRecommendations: async (payload) => {
    const { data } = await api.post("/analysis/job-recommendations", payload);
    return data;
  },
  interviewQuestions: async (payload) => {
    const { data } = await api.post("/interview/questions", payload);
    return data;
  }
};
