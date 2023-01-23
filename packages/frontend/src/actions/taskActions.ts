import config from "src/config";
import { Repo, TaskResponse } from "src/models/User";
import axiosInstance from "src/initAxios";

export const getTasksByQuestId = (questId: string): Promise<TaskResponse[]> => {
  return axiosInstance
    .get(config.api.base_url + "/tasks", {
      params: {
        questId: questId,
      },
    })
    .then((res) => res.data.data);
};

export const getTaskFiles = (taskId: string): Promise<any> => {
  return axiosInstance
    .get(config.api.base_url + "/task/data", {
      params: {
        taskId: taskId,
      },
    })
    .then((res) => res.data.data);
};

export const getTaskById = (taskId: string): Promise<TaskResponse> => {
  return axiosInstance
    .get(config.api.base_url + "/tasks/single", {
      params: {
        taskId: taskId,
      },
    })
    .then((res) => res.data.data);
};

export const updateTaskStatusById = (
  taskId: string,
  status: "To Do" | "In Progress" | "Done"
): Promise<any> => {
  return axiosInstance
    .patch(config.api.base_url + "/task/patch", {
      taskId: taskId,
      status: status,
    })
    .then((res) => res.data.data);
};

export const saveTaskRepo = (repoFiles: Repo[]): Promise<TaskResponse> => {
  return axiosInstance
    .patch(config.api.base_url + "/task/repo/patch", {
      repoFiles: repoFiles,
    })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
};
