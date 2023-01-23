import config from "src/config";
import axiosInstance from "src/initAxios";
import { User } from "src/models/User";

export const updateUser = async (user: User): Promise<any> => {
  return axiosInstance
    .patch(config.api.base_url + "/me/", {
      user: user,
    })
    .then((res) => res.data.data);
};
