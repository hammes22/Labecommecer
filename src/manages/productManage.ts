import { CATEGORY, MessageStatus, Product } from "../types";
import { STATUS } from "../util/status";

const products: Product[] = [
  {
    id: "01",
    name: "camiseta preta",
    price: 52.99,
    category: CATEGORY.CAMISETAS,
  },
  {
    id: "02",
    name: "vestido de bolinha",
    price: 95.99,
    category: CATEGORY.VESTIDOS,
  },
  {
    id: "03",
    name: "calça deans",
    price: 77.99,
    category: CATEGORY.CALCA,
  },
  {
    id: "04",
    name: "camiseta estampada",
    price: 54.99,
    category: CATEGORY.CAMISETAS,
  },
];
export function getAllProducts(): Product[] {
  return products;
}
export function createProduct(
  id: string,
  name: string,
  price: number,
  category: CATEGORY
): string {
  const newProduct: Product = {
    id,
    name,
    price,
    category,
  };
  products.push(newProduct);
  return "Produto criado com sucesso";
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
export function queryProductsByName(name: string): Product[] {
  return products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function deleteProduct(id: string): MessageStatus {
  const accountIndex = products.findIndex((product) => {
    return product.id === id;
  });
  if (accountIndex > -1) {
    products.splice(accountIndex, 1);
    return { message: "Produto deletado com Sucesso", status: STATUS.Ok };
  } else {
    return {
      message: "Produto não encontrado",
      status: STATUS.UnprocessableEntity,
    };
  }
}

export function editProduct(editProduct: Product): MessageStatus {
  const accountIndex = products.findIndex((product) => {
    return product.id === editProduct.id;
  });

  if (accountIndex > -1) {
    products.forEach((product) => {
      if (product.id === editProduct.id) {
        product.name = editProduct.name;
        product.price = editProduct.price;
      }
    });
    return { message: "Produto editado com sucesso", status: STATUS.Ok };
  } else {
    return {
      message: "Produto não encontrado",
      status: STATUS.UnprocessableEntity,
    };
  }
}

export function validaProduct(product: Product): boolean {
  if (product.id && product.name && product.price && product.category) {
    return true;
  } else {
    return false;
  }
}

export function validaNewProduct(newProduct: Product): {
  bool: boolean;
  message: string;
} {
  if (!validaProduct(newProduct)) {
    return { bool: false, message: "Error ao criar Produto dados incompletos" };
  }
  const productId = products.find((product) => {
    return product.id === newProduct.id;
  });

  if (productId) {
    return { bool: false, message: "Id já existe" };
  } else {
    return { bool: true, message: "id e email não existem" };
  }
}

export function validateProductId(id: string): boolean {
  const productIndex = products.findIndex((product) => {
    return product.id === id;
  });
  return productIndex > -1;
}
