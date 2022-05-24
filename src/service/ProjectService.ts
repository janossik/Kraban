import { IProjectProps, IProjectForCreate, IProjectForUpdate } from "@/types";
import { queryWithAuthorization } from "@/utils/client";

const ProjectService = {
  readAll: async () =>
    await queryWithAuthorization<IProjectProps[]>("get", "api/projects"),
  readOne: async (id: string) =>
    await queryWithAuthorization<IProjectProps>("get", `/api/project/${id}`),
  /*   create: async (data: IProjectForCreate) =>
    await queryWithAuthorization("post", "/api/users", null, data),
  update: async (id: string, data: IProjectForUpdate) =>
    await queryWithAuthorization("put", `/api/admin/user/${id}`, null, data),
  remove: async (id: string) =>
    await queryWithAuthorization("delete", `/api/user/${id}`), */
};

export default ProjectService;
``;
