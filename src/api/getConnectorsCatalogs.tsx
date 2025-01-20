import api from "./api";

export const getConnectorsCatalogs = async (name: string) => {
  const response = await api.post(`connectors/catalogue/list`, {
    maxResultCount: 100,
    skipCount: 0,
    sorting: "",
    name: name,
  });
  return response.data;
};
