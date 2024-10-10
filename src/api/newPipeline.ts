import api from "./api";

export const createPipeline = async () => {

    const pipeline = {
        "name": "New Pipeline 1",
        "type": 1
      }
  const response = await api.put("/pipelines", pipeline);
  return response.data;
};
