import api from "./api";

export const startJob = async (pipelineId: string , graph: any) => {
    const data = {
        "pipelineId": pipelineId,
        "preview": true,
        "graph": graph
      }
    const response = await api.put(`/jobs`, data);
    return response.data;
};
