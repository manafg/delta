import api from "./api";
interface PipelineParams {
  maxResultCount: number;
  name: string;
  skipCount: number;
  sorting: string;
  status: number;
  userName: string;
}

export const fetchPipelineList = async ({
  maxResultCount,
  skipCount,
  sorting,
  userName,
  name,
  status
}: PipelineParams) => {
  try {
    const response = await api.post("/pipelines/list", {
      maxResultCount,
      skipCount,
      sorting,
      userName, // current username if "view my only" toggle is enabled
      name, // search text
      status
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pipeline list:", error);
    throw error;
  }
};
