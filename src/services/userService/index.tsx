import axios, { AxiosResponse } from "axios";
import { SignInData, UpdateUserData } from "../../types/user";
import instance from "../../utils/axios.ts";

export const signIn = async (data: SignInData): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/sign-in",
      data
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const update = async (data: UpdateUserData): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.post("/users/update", data);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const findAll = async (): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.get("/users");
    return res;
  } catch (error) {
    throw error as Error;
  }
};
