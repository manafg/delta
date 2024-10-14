import api from "./api";

export const startJob = async (
  pipelineId: string,
  graph: any,
  preview: boolean = false
) => {
  const data = {
    pipelineId,
    preview,
    graph,
  };
  const response = await api.put(`/jobs`, data);
  return response.data;
};
