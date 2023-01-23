import axiosInstance from "src/initAxios";
import config from "src/config";

export const getAllQuests = (): Promise<any> => {
  return axiosInstance.get(config.api.base_url + "/quests").then((res) => {
    return res.data.data;
  });
};
