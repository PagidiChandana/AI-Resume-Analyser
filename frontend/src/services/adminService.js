import api from "./api";

export const adminService = {
  getUsers: async () => {
    const { data } = await api.get("/admin/users");
    return data;
  },
  deleteUser: async (id) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },
  getUploads: async () => {
    const { data } = await api.get("/admin/uploads");
    return data;
  },
  getStatistics: async () => {
    const { data } = await api.get("/admin/statistics");
    return data;
  },
  getAnalysisCount: async () => {
    const { data } = await api.get("/admin/analysis-count");
    return data;
  }
};
