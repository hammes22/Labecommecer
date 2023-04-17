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
  purchaseId: string;
  totalPrice: number;
  isPaid?: Number;
  buyerId: string;
};

export type PurchaseProduct = {
  purchase_id: string;
  product_id: string;
  quantity: number;
};

export type MessageStatus = {
  message: string;
  status: STATUS;
};
export type MessageError = {
  invalid: boolean;
  message: string;
};
