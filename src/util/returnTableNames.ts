export enum TABELA_PURCHASES {
  PURCHASES = "purchases",
  BUYER_ID = "purchases.buyerId",
  purchaseId = "purchases.purchaseId",
  totalPrice = "purchases.totalPrice",
  createdAt = "purchases.created_at",
  isPaid = "purchases.isPaid",
}

export enum TABELA_USERS {
  USERS = "users",
  USERS_ID = "users.id",
  email = "users.email",
  name = "users.name",
}

export enum TABELA_PURCHASES_PRODUCTS {
  purchases_products = "purchases_products",
  purchase_id = "purchase_id",
  product_id = "product_id",
  quantity = "quantity",
}
export enum TABELA_PRODUCTS {
  products = "products",
  id = "products.id",
  name = "name",
  price = "price",
  description = "description",
  image_url = "image_url",
}
