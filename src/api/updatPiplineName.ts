import api from "./api";

export const updatePipelineName = (pipelineId: string, newName: string) => {
    return api.patch(`/pipelines/${pipelineId}/info`, { name: newName , description: 'test' });
};
