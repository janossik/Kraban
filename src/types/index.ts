export interface IUser {
  uid: string;
  lastName: string;
  firstName: string;
  permission: number;
  email: string;
  status: boolean;
}
export interface IUserForUpdate {
  lastName?: string;
  firstName?: string;
  permission?: number;
  email?: string;
  status?: boolean;
}
