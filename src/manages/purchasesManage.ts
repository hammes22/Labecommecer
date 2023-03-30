import { Purchase } from "../types";
import { getProductById, validateProductId } from "./productManage";
import { validateUserId } from "./userManage";

const purchases: Purchase[] = [
  {
    userId: "001",
    productId: "002",
    quantity: 10,
    totalPrice: 59.9,
  },
  {
    userId: "001",
    productId: "004",
    quantity: 6,
    totalPrice: 49.9,
  },
  {
    userId: "003",
    productId: "002",
    quantity: 10,
    totalPrice: 59.9,
  },
];

export function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
): string {
  const newPurchase: Purchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };
  purchases.push(newPurchase);
  return "pedido realizado com sucesso";
}

export function getAllPurchasesFromUserId(userId: string): Purchase[] {
  return purchases.filter((purchase) => purchase.userId === userId);
}
export function validaPurchase(newPurchase: Purchase): boolean {
  if (
    newPurchase.productId &&
    newPurchase.userId &&
    newPurchase.quantity &&
    newPurchase.totalPrice
  ) {
    return true;
  } else {
    return false;
  }
}
export function validaNewPurchase(newPurchase: Purchase): {
  bool: boolean;
  message: string;
} {
  if (!validaNewPurchase) {
    return { bool: false, message: "Error ao criar pedido dados incompletos" };
  }
  if (!validateUserId(newPurchase.userId)) {
    return { bool: false, message: "usuario invalido" };
  }
  if (!validateProductId(newPurchase.productId)) {
    return { bool: false, message: "Produto invalido" };
  }
  if (!calcPurchase(newPurchase)) {
    return { bool: false, message: "valor total  invalido" };
  }

  return { bool: true, message: " tudo ok" };
}

function calcPurchase(newPurchase: Purchase): boolean {
  const product = getProductById(newPurchase.productId);

  const total = (product?.price as number) * newPurchase.quantity;

  console.log(total, newPurchase.totalPrice);
  return total === newPurchase.totalPrice;
}
