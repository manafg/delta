import api from "./api";

export const getJobInfo = async (jobId: string) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

export const pauseJob = async (jobId: string) => {
    const response = await api.post(`/jobs/${jobId}/pause`);
    return response.data;
  };

export const resumeJob = async (jobId: string) => {
  const response = await api.post(`/jobs/${jobId}/unpause`);
  return response.data;
};

export const cancelJob = async (jobId: string) => {
  const response = await api.post(`/jobs/${jobId}/stop`);
  return response.data;
  };


