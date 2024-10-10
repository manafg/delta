import api from "./api";

export const updatePipelineGraph = async (pipelineId: string, graph: any) => {
    const data = { graph: JSON.stringify(graph) };
    const response = await api.patch(`/pipelines/${pipelineId}/graph`, data);
    return response.data;
};
