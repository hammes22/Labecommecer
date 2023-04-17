import { db } from "../database/knex";
import { Purchase, PurchaseProduct } from "../types";
import {
  TABELA_PRODUCTS,
  TABELA_PURCHASES,
  TABELA_PURCHASES_PRODUCTS,
  TABELA_USERS,
} from "../util/returnTableNames";
import { STATUS } from "../util/status";
import { getUserById } from "./userManage";
import { sumByPropName } from "../util/somaPurchases";

export async function getAllPurchase() {
  const purchases = await db
    .select(
      TABELA_PURCHASES.purchaseId,
      TABELA_PURCHASES.BUYER_ID,
      TABELA_USERS.name
    )
    .from(TABELA_PURCHASES.PURCHASES)
    .innerJoin(
      TABELA_USERS.USERS,
      TABELA_USERS.USERS_ID,
      "=",
      TABELA_PURCHASES.BUYER_ID
    );

  for (const item of purchases) {
    item.ProductList = await db
      .select(TABELA_PURCHASES_PRODUCTS.product_id)
      .from(TABELA_PURCHASES_PRODUCTS.purchases_products)
      .where({ purchase_id: item.purchaseId })
      .innerJoin(
        TABELA_PRODUCTS.products,
        TABELA_PURCHASES_PRODUCTS.product_id,
        "=",
        TABELA_PRODUCTS.id
      );
  }
  return purchases;
}

export async function getPurchaseId(id: string): Promise<Purchase[]> {
  const [purchasesId] = await db
    .select("purchaseId")
    .from(TABELA_PURCHASES.PURCHASES)
    .where({ purchaseId: id });

  if (purchasesId) {
    const purchasesUser = await db
      .select(
        TABELA_PURCHASES.purchaseId,
        TABELA_PURCHASES.totalPrice,
        TABELA_PURCHASES.createdAt,
        TABELA_PURCHASES.isPaid,
        TABELA_PURCHASES.BUYER_ID,
        TABELA_USERS.email,
        TABELA_USERS.name
      )
      .from(TABELA_PURCHASES.PURCHASES)
      .where({ purchaseId: id })
      .innerJoin(
        TABELA_USERS.USERS,
        TABELA_PURCHASES.BUYER_ID,
        "=",
        TABELA_USERS.USERS_ID
      );

    const purchasesProduct = await db
      .select(
        TABELA_PURCHASES_PRODUCTS.product_id,
        TABELA_PRODUCTS.name,
        TABELA_PURCHASES_PRODUCTS.quantity,
        TABELA_PRODUCTS.price,
        TABELA_PRODUCTS.description,
        TABELA_PRODUCTS.image_url
      )

      .from(TABELA_PURCHASES_PRODUCTS.purchases_products)
      .where({ purchase_id: id })
      .innerJoin(
        TABELA_PRODUCTS.products,
        TABELA_PURCHASES_PRODUCTS.product_id,
        "=",
        TABELA_PRODUCTS.id
      );

    return {
      ...purchasesUser[0],
      ProductList: purchasesProduct,
    };
  } else {
    throw new Error("Pedido não encontrado");
  }
}

export async function createPurchase(
  newPurchase: Purchase,
  newPurchaseProduct: PurchaseProduct[]
): Promise<string> {
  try {
    await validaPurchase(newPurchase);
    await validaPurchaseProduct(newPurchaseProduct);

    const reducePurchaseProduct = sumByPropName(
      TABELA_PURCHASES_PRODUCTS.product_id,
      TABELA_PURCHASES_PRODUCTS.quantity,
      newPurchaseProduct
    );
    await validaProductSomaTotal(reducePurchaseProduct, newPurchase.totalPrice);
    const [id] = await db
      .insert(newPurchase)
      .returning(TABELA_PURCHASES.purchaseId)
      .into(TABELA_PURCHASES.PURCHASES)
      .then((id) => {
        if (id) {
          return id;
        } else {
          throw new Error("error ao conectar com banco");
        }
      });

    if (id) {
      for (let item of reducePurchaseProduct) {
        item.purchase_id = id.purchaseId;
        await db
          .insert(item)
          .into(TABELA_PURCHASES_PRODUCTS.purchases_products);
      }
    }
    return `Pedido N°: ${id.purchaseId} realizado com sucesso`;
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}

export async function deletePurchase(id: string) {
  try {
    const [purchase] = await db(TABELA_PURCHASES.PURCHASES).where({
      purchaseId: id,
    });
    if (purchase) {
      await db.del().from(TABELA_PURCHASES.PURCHASES).where({ purchaseId: id });
      return "Pedido deletado com sucesso";
    } else {
      throw new Error("Pedido não encontrado");
    }
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

export async function deleteProductPurchase(
  idpurchase: string,
  idproduct: string
) {
  try {
    const purchaseProduct = await db(
      TABELA_PURCHASES_PRODUCTS.purchases_products
    ).where({ purchase_id: idpurchase });

    if (purchaseProduct.length <= 0) {
      throw new Error("Pedido não encontrado");
    }

    const containProduct = purchaseProduct.some((i: PurchaseProduct) =>
      i.product_id.includes(idproduct)
    );

    if (!containProduct) {
      throw new Error("Produto não encontrado no pedido");
    }

    await db
      .del()
      .from(TABELA_PURCHASES_PRODUCTS.purchases_products)
      .where({ purchase_id: idpurchase, product_id: idproduct });



    return `produto ${idproduct} deletado do pedido ${idpurchase}`;
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

export async function validaPurchase(newPurchase: Purchase) {
  const { totalPrice, buyerId } = newPurchase;
  try {
    if (!buyerId) {
      throw new Error("id do usuario obrigatório");
    } else {
      await getUserById(buyerId);
    }
    if (!totalPrice) {
      throw new Error("valor obrigatório");
    } else {
      if (isNaN(totalPrice)) {
        throw new Error("valor invalidada");
      } else if (totalPrice <= 0) {
        throw new Error("valor tem que ser maior que 0");
      }
    }
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

async function validaPurchaseProduct(newPurchaseProduct: PurchaseProduct[]) {
  try {
    newPurchaseProduct.forEach((p) => {
      if (!p.product_id) {
        throw new Error(`obrigatório id do produto`);
      }
      if (!p.quantity) {
        if (p.quantity <= 0) {
          throw new Error("valor tem que ser maior que 0");
        }
        throw new Error("quantidade obrigatória");
      } else if (isNaN(p.quantity)) {
        throw new Error("valor invalido");
      } else if (p.quantity <= 0) {
        throw new Error("valor tem que ser maior que 0");
      }
    });

    const reducePurchaseProduct = sumByPropName(
      TABELA_PURCHASES_PRODUCTS.product_id,
      TABELA_PURCHASES_PRODUCTS.quantity,
      newPurchaseProduct
    );
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

async function validaProductSomaTotal(
  reducePurchaseProduct: PurchaseProduct[],
  totalPurchase: number
) {
  try {
    let total = 0;
    for (const item of reducePurchaseProduct) {
      const [id] = await db
        .select("*")
        .from(TABELA_PRODUCTS.products)
        .where({ id: item.product_id });
      if (!id) {
        throw new Error(`Produto ${item.product_id} não encontrado`);
      } else {
        total += id.price * item.quantity;
      }
    }
    if (total != totalPurchase) {
      throw new Error(`Total do pedido incorreto, Total esperado e: ${total}`);
    }
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}
