import { ITaskProps } from "@/types";
import { queryWithAuthorization } from "@/utils/client";

const TaskService = {
  readAll: async (projectId: string, columnId: string) =>
    await queryWithAuthorization<ITaskProps[]>(
      "get",
      `/api/project/${projectId}/column/${columnId}/tasks`
    ),
  read: async (id: string) => {},
  create: async (data: any) => {},
  update: async (id: string, data: any) => {},
  remove: async (id: string) => {},
};

export default TaskService;
