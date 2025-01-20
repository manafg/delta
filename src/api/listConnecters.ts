import api from "./api";

export const postConnectorsList = async (pageSize: number, pageNumber: number, direction: number, environment: number, status: number) => {
  const payload = {
    maxResultCount: pageSize,
    skipCount: pageNumber,
    direction,
    environment,
    status,
  };

  try {
    const response = await api.post('/connectors/list', payload);
    return response.data;
  } catch (error) {
    console.error("Error posting connectors list:", error);
    throw error;
  }
};
