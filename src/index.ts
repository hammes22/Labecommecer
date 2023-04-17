import express, { Request, Response } from "express";
import cors from "cors";
import { STATUS } from "./util/status";
import { ReturnPath } from "./util/returnPath";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "./manages/userManage";

import { Product, Purchase, PurchaseProduct, User } from "./types";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
} from "./manages/productManage";
import {
  createPurchase,
  deleteProductPurchase,
  deletePurchase,
  getAllPurchase,
  getPurchaseId,
} from "./manages/purchasesManage";
import { TABELA_PURCHASES_PRODUCTS } from "./util/returnTableNames";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Bem Vindo! Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//Usuários
app.get(ReturnPath.Users, async (req: Request, res: Response) => {
  try {
    res.status(STATUS.Ok).send(await getAllUsers());
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error);
  }
});

app.post(ReturnPath.Users, async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const result: string = await createUser(newUser);
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.UserId, async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await editUser(user);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.delete(ReturnPath.UserId, async (req: Request, res: Response) => {
  console.log("delete user");
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

//Products

app.get(ReturnPath.Products, async (req: Request, res: Response) => {
  try {
    res.status(STATUS.Ok).send(await getAllProducts());
  } catch (error) {
    res.status(STATUS.BadRequest).send(error);
  }
});

app.get(ReturnPath.ProductSearch, async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    if (search.length <= 1) {
      throw new Error("Pesquisa tem que ter no mínimo 2 caracteres");
    }
    const result = await queryProductsByName(search);
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.get(ReturnPath.ProductsId, async (req: Request, res: Response) => {
  try {
    const result = await getProductById(req.params.id);
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Products, async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
    };

    const result = createProduct(product);
    res.status(STATUS.Created).send(await result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.ProductsId, async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      price: req.body.price,
    };
    const result = await editProduct(product);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.delete(ReturnPath.ProductsId, async (req: Request, res: Response) => {
  try {
    const result = await deleteProduct(req.params.id);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

//Purchases

app.get(ReturnPath.PurchasesId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(STATUS.Ok).send(await getPurchaseId(id));
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Purchases, async (req: Request, res: Response) => {
  try {
    const newPurchase: Purchase = {
      purchaseId: Math.floor(Date.now() * Math.random()).toString(36),
      totalPrice: req.body.totalPrice,
      isPaid: Number(req.body.isPaid),
      buyerId: req.body.buyerId,
    };
    const newPurchaseProduct: PurchaseProduct[] = req.body.purchasesProduct;
    const result = await createPurchase(newPurchase, newPurchaseProduct);
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    res.status(error.statusCode).send(error.message);
  }
});

app.get(ReturnPath.Purchases, async (req: Request, res: Response) => {
  try {
    res.status(STATUS.Ok).send(await getAllPurchase());
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    res.status(error.statusCode).send(error.message);
  }
});

app.delete(ReturnPath.PurchasesId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(STATUS.Ok).send(await deletePurchase(id));
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    res.status(error.statusCode).send(error.message);
  }
});

app.get(ReturnPath.PurchasesProducts, async (req: Request, res: Response) => {
  try {
    const PurchasesProducts = await db(
      TABELA_PURCHASES_PRODUCTS.purchases_products
    );
    res.status(STATUS.Ok).send(PurchasesProducts);
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    res.status(error.statusCode).send(error.message);
  }
});

app.delete(
  ReturnPath.PurchasesProductsId,
  async (req: Request, res: Response) => {
    try {
      const idpurchase = req.params.idpurchase;
      const idproduct = req.params.idproduct;
      res
        .status(STATUS.Ok)
        .send(await deleteProductPurchase(idpurchase, idproduct));
    } catch (error: any) {
      error.statusCode
        ? error.statusCode
        : (error.statusCode = STATUS.BadRequest);
      res.status(error.statusCode).send(error.message);
    }
  }
);
