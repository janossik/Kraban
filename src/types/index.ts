export interface IUserProps {
  uid: string;
  name: string;
  lastName: string;
  firstName: string;
  permission: number;
  email: string;
  status: boolean;
}
export interface IUserForUpdate {
  name?: string;
  lastName?: string;
  firstName?: string;
  permission?: number;
  email?: string;
  status?: boolean;
}
export interface IUserForCreate {
  lastName: string;
  firstName: string;
  email: string;
}

export interface IProjectProps {
  id: string;
  title: string;
  teams: string[];
}

export interface IProjectForCreate {
  title: string;
}

export interface IProjectForUpdate {
  title?: string;
}

export interface IColumnProps {
  id: string;
  title: string;
  order: string;
  wip: string;
}

export interface IColumnForCreate {
  title: string;
  order: string;
  wip: string;
}

export interface IColumnForUpdate {
  title?: string;
  order?: string;
  wip?: string;
}

export interface ITaskProps {
  id: string;
  title: string;
  detail: string;
  description: string;
  color: string;
  backgroundColor: string;
  user: {
    uid: string;
    name: string;
  };
  author: {
    uid: string;
    name: string;
  };
  deadline: { seconds: number; nanoseconds: number };
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}
export interface ITaskForCreate {
  title: string;
  detail: string;
  description: string;
  color: string;
  backgroundColor: string;
  user: {
    uid: string;
    name: string;
  };
  deadline: { seconds: number; nanoseconds: number };
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}
export interface ITaskForUpdate {
  title?: string;
  detail?: string;
  description?: string;
  color?: string;
  backgroundColor?: string;
  user?: {
    uid: string;
    name: string;
  };
  author?: {
    uid: string;
    name: string;
  };
  deadline?: { seconds: number; nanoseconds: number };
}
