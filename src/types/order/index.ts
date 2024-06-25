export type OrderData = {
  id: string;
  orderDate: string;
  totalAmount: number;
  note: string;
  status: string;
  user: {
    id: string;
    name: string;
  };
};

export type OrderUser = {
  id: string;
  orderDate: string;
  totalAmount: number;
  note: string;
  status: string;
  userId: string;
};

export type OrderDetailData = {
  id: string;
  orderDate: string;
  totalAmount: number;
  note: string;
  status: string;
  userId: string;
  orderItems: [
    {
      id: string;
      quantity: number;
      price: number;
      product: {
        id: string;
        name: string;
        imageUrl: string;
      };
    }
  ];
};
