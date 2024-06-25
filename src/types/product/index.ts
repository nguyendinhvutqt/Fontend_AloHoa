export type ProductItemData = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  soldQuantity: number;
  imageUrl: string;
  imagePublicId: string;
  categoryId: string;
};

export type AddProductData = {
  name: string;
  description: string;
  price: string;
  file: File;
  categoryId: string;
};

export type UpdateProductData = {
  name: string;
  description: string;
  price: string;
  categoryId: string;
};
