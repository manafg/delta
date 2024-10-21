import api from "./api";

export const validatePipeline = async (pipelineId: string) => {
  const response = await api.post(`/pipelines/${pipelineId}/validate`);
  return response.data;
};
