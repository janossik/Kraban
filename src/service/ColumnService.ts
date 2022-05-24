import { IColumnProps, IProjectProps } from "@/types";
import { queryWithAuthorization } from "@/utils/client";

const ColumnService = {
  readAll: async (idProject: string) =>
    await queryWithAuthorization<IColumnProps[]>(
      "get",
      `/api/project/${idProject}/columns`
    ),
  read: async (id: string) => {},
  create: async (data: any) => {},
  update: async (id: string, data: any) => {},
  remove: async (id: string) => {},
};
export default ColumnService;
