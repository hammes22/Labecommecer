import { db } from "../database/knex";
import { MessageStatus, Product } from "../types";
import { TABELA_PRODUCTS } from "../util/returnTableNames";
import { STATUS } from "../util/status";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await db
      .select(
        TABELA_PRODUCTS.Id,
        TABELA_PRODUCTS.Name,
        TABELA_PRODUCTS.Description,
        TABELA_PRODUCTS.Price,
        TABELA_PRODUCTS.Image_url
      )
      .from(TABELA_PRODUCTS.Products);
    if (products.length > 0) {
      return products;
    } else {
      throw new Error("Error ao buscar Produtos");
    }
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}

export async function queryProductsByName(name: string): Promise<Product[]> {
  try {
    const product = await db(TABELA_PRODUCTS.Products).whereLike(
      "name",
      `%${name}%`
    );
    if (product.length > 0) {
      return product;
    } else {
      throw new Error("Produto não encontrado");
    }
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const [product] = await db
      .select(
        TABELA_PRODUCTS.Id,
        TABELA_PRODUCTS.Name,
        TABELA_PRODUCTS.Price,
        TABELA_PRODUCTS.Description,
        TABELA_PRODUCTS.Image_url
      )
      .from(TABELA_PRODUCTS.Products)
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
  try {
    validaProduct(newProduct);
    await db.insert(newProduct).from("products");
    return "Produto criado com sucesso";
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
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
      .from(TABELA_PRODUCTS.Products)
      .where({ id: editProduct.id });
    return { message: "Produto editado com sucesso", status: STATUS.Ok };
  } else {
    throw new Error("produto não encontrado");
  }
}

export async function deleteProduct(id: string): Promise<MessageStatus> {
  const [product] = await db(TABELA_PRODUCTS.Products).where({ id });
  if (product) {
    await db.del().from(TABELA_PRODUCTS.Products).where({ id: id });
    return { message: "Produto deletado com Sucesso", status: STATUS.Ok };
  } else {
    throw new Error("Produto não encontrado");
  }
}

export function validaProduct(product: Product) {
  try {
    if (!product.name) {
      throw new Error("Nome do produto invalido");
    }
    if (!product.price || isNaN(product.price)) {
      throw new Error("preço do produto invalido");
    }
    if (!product.image_url) {
      throw new Error("imagem do produto invalido");
    }
    if (!product.name) {
      throw new Error("descrição do produto invalido");
    }
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}
