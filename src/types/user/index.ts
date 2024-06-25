import { RoleUser } from "../../enums/user/role.enum";

export type UserData = {
  userId: string;
  email: string;
  avatar: string | null;
  role: RoleUser;
  username: string;
  address: string | null;
  phone: string | null;
};
export type UserDataAdmin = {
  id: string;
  email: string;
  name: string;
  address: string | null;
  phone: string | null;
};

export type SignInData = {
  email: string;
  password: string;
};

export type UpdateUserData = {
  username: string;
  address: string;
  phone: string;
};
