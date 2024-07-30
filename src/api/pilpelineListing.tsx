import api from "./api";


export const fetchPipelineList = async (
  maxResultCount = 10,
  skipCount = 0,
  sorting = "",
  userName = "",
  name = "",
  status = 0
) => {
  try {
    const response = await api.post("/pipelines/list", {
      maxResultCount: 10,
      skipCount: 0,
      sorting: "",
      userName, // current username if "view my only" toggle is enabled
      name, // search text
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pipeline list:", error);
    throw error;
  }
};

// ... existing code ...
