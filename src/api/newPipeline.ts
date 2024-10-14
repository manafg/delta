import api from "./api";

export const createPipeline = async () => {

    const pipeline = {
        "type": 1
      }
  const response = await api.put("/pipelines", pipeline);
  return response.data;
};
