import { AxiosResponse } from "axios";
import axios from "../../utils/axios";
import instance from "../../utils/axios";

export const getCategories = async (): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get("/categories");
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const getCategoriesAndPagination = async (
  page: number,
  take: number,
  searchValue: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(
      `/categories/pagination?page=${page}&take=${take}&searchValue=${searchValue}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const getCategoriesByName = async (
  name: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post("/categories/findByName", {
      name,
    });
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const addCategory = async (data: {
  name: string;
}): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.post("/categories", data);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const updateCategory = async (
  cateoryId: string,
  data: {
    name: string;
  }
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.patch(
      `/categories/update/${cateoryId}`,
      data
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const dellCategory = async (data: {
  categoryId: string;
}): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.delete(
      `/categories/${data.categoryId}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};
