export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPublicInfo {
  id: string;
  name: string;
  email: string;
}

export type TCreateUserBody = {
  email: string;
  password: string;
  name: string;
};

export type TLoginUserBody = Omit<TCreateUserBody, "name">;
