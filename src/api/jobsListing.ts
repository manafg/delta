import api from "./api";

export const postJobsList = async (pageSize: number, pageNumber: number) => {
  const payload = {
    maxResultCount: pageSize,
    skipCount: pageNumber,
  };

  try {
    const response = await api.post('/jobs/list', payload);
    return response.data;
  } catch (error) {
    console.error("Error posting jobs list:", error);
    throw error;
  }
};
