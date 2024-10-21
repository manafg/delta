import api from "./api";

export const publishPipeline = async (pipelineId: string) => {
  const response = await api.post(`/pipelines/${pipelineId}/publish`);
  return response.data;
};
