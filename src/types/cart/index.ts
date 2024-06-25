import { ProductItemData } from "../product";

export type CartData = {
  product: ProductItemData;
  quantity: number;
};

export type CartItemData = {
  productId: string;
  quantity: number;
  price: number;
};

export type CartPaypent = {
  userId: string | undefined;
  totalAmount: number;
  note?: string;
  orderItems: CartItemData[];
};
