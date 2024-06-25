import { AxiosResponse } from "axios";
import instance from "../../utils/axios";
import { CartPaypent } from "../../types/cart";

export const createOrder = async (
  data: CartPaypent
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.post("/orders/create", data);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const findAllAndPagination = async (
  page: number,
  take: number,
  searchValue: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.get(
      `/orders/pagination?page=${page}&take=${take}&searchValue=${searchValue}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const findOrderDetailsByOrderId = async (
  orderId: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.get(`/orders/detail/${orderId}`);
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const update = async (
  orderId: string,
  status: string
): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await instance.patch(
      `/orders/update/${orderId}`,
      { status: status }
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};

export const findAllByUser = async (
  page: number,
  take: number,
  searchValue?: string
): Promise<AxiosResponse> => {
  try {
    const res = await instance.get(
      `/orders/user?page=${page}&take=${take}&searchValue=${searchValue}`
    );
    return res;
  } catch (error) {
    throw error as Error;
  }
};
