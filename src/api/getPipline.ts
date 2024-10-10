import api from "./api";

export const getPipeline = async (pipelineId: string) => {
    const response = await api.get(`/pipelines/${pipelineId}`);
    return response.data;
};
