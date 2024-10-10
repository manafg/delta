import api from "./api";

export async function getJobPreview(jobId: string, stepId: string) {
    const response = await api.get(`pipelineeditor/read_preview`, {
        params: {
            jobId: jobId,
            stepId: stepId
        }
    });
    return response.data;
}

