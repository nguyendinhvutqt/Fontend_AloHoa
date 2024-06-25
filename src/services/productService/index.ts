import axios from "../../utils/axios";
import { AxiosResponse } from "axios";
import instance from "../../utils/axios";
import { UpdateProductData } from "../../types/product";

export const getProducts = async (): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get("/products/findAll");
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const getProductsAndPagination = async (
  page: number,
  take: number,
  searchValue: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(
      `/products/pagination?page=${page}&take=${take}&searchValue=${searchValue}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const addProduct = async (data: FormData): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.post("/products/create", data);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductData
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.patch(
      `/products/update/${productId}`,
      data
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const delProduct = async (productId: string): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.delete(
      `/products/delete/${productId}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const getProductById = async (
  productId: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(
      `/products/findById/${productId}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const getProductsByCategoryId = async (
  categoryId: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(
      `/products/findByCategoryId/${categoryId}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const searchProducts = async (name: string): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.get(`/products/search/${name}`);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const searchProductsByPrice = async (
  minPrice: number,
  maxPrice: number
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(`/products/searchByPrice/`, {
      minPrice,
      maxPrice,
    });
    return res;
  } catch (error) {
    throw error as Error;
  }
};
