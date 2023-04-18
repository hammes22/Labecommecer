export enum TABELA_PURCHASES {
  PURCHASES = "purchases",
  BUYER_ID = "purchases.buyerId",
  purchaseId = "purchases.purchaseId",
  totalPrice = "purchases.totalPrice",
  createdAt = "purchases.created_at",
  isPaid = "purchases.isPaid",
}

export enum TABELA_USERS {
  Users_Id = "users.id",
  Name = "users.name",
  Users = "users",
  Email = "users.email",
  Password = "users.password",
  CreatedAt = "users.created_at as createdAt",
}

export enum TABELA_PURCHASES_PRODUCTS {
  PurchasesProducts = "purchases_products",
  PurchaseId = "purchases_products.purchase_id as purchaseId",
  ProductId = "purchases_products.product_id as productId",
  Quantity = "purchases_products.quantity",
}
export enum TABELA_PRODUCTS {
  Products = "products",
  Id = "products.id",
  Name = "products.name",
  Price = "products.price",
  Description = "products.description",
  Image_url = "products.image_url as imageUrl",
}
