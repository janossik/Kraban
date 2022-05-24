import { IUserProps, IUserForCreate, IUserForUpdate } from "@/types";
import { queryWithAuthorization } from "@/utils/client";

interface IUserService {
  readLimit: (limit: number, uid?: string) => Promise<IUserProps[]>;
  readAll: () => Promise<IUserProps[]>;
  readOne: (id: string) => Promise<IUserProps>;
  create: (data: IUserForCreate) => Promise<IUserProps>;
  update: (id: string, data: IUserForUpdate) => Promise<IUserProps>;
  remove: (id: string) => Promise<void>;
}

const UserService: IUserService = {
  readLimit: async (limit, uid = "0") =>
    await queryWithAuthorization("get", `/api/admin/users/${limit}/${uid}`),
  readAll: async () => await queryWithAuthorization("get", "/api/admin/users"),
  readOne: async (id: string) =>
    await queryWithAuthorization("get", `/api/user/${id}`),
  create: async (data: IUserForCreate) =>
    await queryWithAuthorization("post", "/api/admin/users", null, data),
  update: async (id: string, data: IUserForUpdate) =>
    await queryWithAuthorization("put", `/api/admin/user/${id}`, null, data),
  remove: async (id: string) =>
    await queryWithAuthorization("delete", `/api/user/${id}`),
};

export default UserService;
