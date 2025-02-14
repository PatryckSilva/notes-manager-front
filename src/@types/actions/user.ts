export type TCreateUserBody = {
  email: string;
  password: string;
  name: string;
};

export type TLoginUserBody = Omit<TCreateUserBody, "name">;
