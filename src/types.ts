import { STATUS } from "./util/status";

export enum CATEGORY {
  CAMISETAS = "camisetas",
  CALCA = "calça",
  VESTIDOS = "vestidos",
}

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: CATEGORY;
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