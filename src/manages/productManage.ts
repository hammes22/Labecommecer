import { db } from "../database/knex";
import { MessageStatus, Product } from "../types";
import { STATUS } from "../util/status";

export async function getAllProducts(): Promise<Product[]> {
  const products = await db.raw(` SELECT * FROM products `);
  return products;
}

export async function createProduct(product: Product): Promise<string> {
  await db.raw(`
  INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
  '${Math.floor(Date.now() * Math.random()).toString(36)}',
  '${product.name}',
  '${product.price}',
  '${product.description}',
  '${product.image_url}'
    );
  `);
  return "Produto criado com sucesso";
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const product = await db.raw(`SELECT * FROM products WHERE id = '${id}';`);
  return product;
}

export async function queryProductsByName(name: string): Promise<Product[]> {
  const product = await db.raw(
    `SELECT * From products WHERE name LIKE '%${name}%';`
  );
  return product;
}

export async function deleteProduct(id: string): Promise<MessageStatus> {
  await db.raw(`DELETE FROM products WHERE id = '${id}';`);
  return { message: "Produto deletado com Sucesso", status: STATUS.Ok };
}

export async function editProduct(
  editProduct: Product
): Promise<MessageStatus> {
  const [product] = await await db.raw(
    `select * from  products
   WHERE id = '${editProduct.id}';`
  );

  const name = editProduct.name ? editProduct.name : product.name;
  const price = editProduct.price ? editProduct.price : product.price;
  const description = editProduct.description
    ? editProduct.description
    : product.description;
  const image_url = editProduct.image_url
    ? editProduct.image_url
    : product.image_url;

  await db.raw(
    `UPDATE products SET
     name = '${name}',
     price = '${price}',
     description = '${description}',
     image_url = '${image_url}'
     WHERE id = '${editProduct.id}';`
  );

  return { message: "Produto editado com sucesso", status: STATUS.Ok };
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


export async function validateProductId(id: string): Promise<boolean> {
  const product = await db.raw(`SELECT id FROM products WHERE id = '${id}';`);
  return product.length > 0 ? true : false;
}
