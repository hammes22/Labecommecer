import { STATUS } from "./util/status";


export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
};

export type Product = {
  id?: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export type Purchase = {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
};

export type MessageStatus = {
  message: string;
  status: STATUS;
};
