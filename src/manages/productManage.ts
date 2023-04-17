import { db } from "../database/knex";
import { MessageStatus, Product } from "../types";
import { TABELA_PRODUCTS } from "../util/returnTableNames";
import { STATUS } from "../util/status";

export async function getAllProducts(): Promise<Product[]> {
  const products = await db("products");
  return products;
}

export async function queryProductsByName(name: string): Promise<Product[]> {
  const product = await db("products").whereLike("name", `%${name}%`);
  return product;
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const [product] = await db
      .select("*")
      .from(TABELA_PRODUCTS.products)
      .where({ id: id });

    if (product) {
      return product;
    } else {
      throw new Error("Produto não encontrado");
    }
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

export async function createProduct(newProduct: Product): Promise<string> {
  const validateProduct = validaProduct(newProduct);
  if (validateProduct.bool) {
    await db.insert(newProduct).from("products");
    return "Produto criado com sucesso";
  } else {
    throw new Error(validateProduct.message);
  }
}

export async function editProduct(
  editProduct: Product
): Promise<MessageStatus> {
  const [product] = await db("products").where({ id: editProduct.id });

  if (product) {
    await db
      .update({
        name: editProduct.name || product.name,
        price: editProduct.price || product.price,
        description: editProduct.description || product.description,
        image_url: editProduct.image_url || product.image_url,
      })
      .from("products")
      .where({ id: editProduct.id });
    return { message: "Produto editado com sucesso", status: STATUS.Ok };
  } else {
    throw new Error("produto não encontrado");
  }
}

export async function deleteProduct(id: string): Promise<MessageStatus> {
  const [product] = await db("products").where({ id });
  if (product) {
    await db.del().from("products").where({ id: id });
    return { message: "Produto deletado com Sucesso", status: STATUS.Ok };
  } else {
    throw new Error("Produto não encontrado");
  }
}

export function validaProduct(product: Product): {
  bool: boolean;
  message: string;
} {
  if (
    product.name &&
    product.price &&
    product.image_url &&
    product.description
  ) {
    return { bool: true, message: "ok" };
  } else {
    return { bool: false, message: "Error ao criar Produto dados incompletos" };
  }
}
