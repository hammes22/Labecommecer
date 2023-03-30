import express, { Request, Response } from "express";
import cors from "cors";
import { STATUS } from "./util/status";
import { ReturnPath } from "./util/returnPath";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  validaNewUser,
  validateUserId,
  validaUser,
} from "./manages/userManage";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  validaNewProduct,
  validaProduct,
  validateProductId,
} from "./manages/productManage";
import {
  createPurchase,
  getAllPurchasesFromUserId,
  validaNewPurchase,
} from "./manages/purchasesManage";
import { Product, User } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Bem Vindo! Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get(ReturnPath.Users, (req: Request, res: Response) => {
  try {
    // throw new Error();
    res.status(STATUS.Ok).send(getAllUsers());
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error);
  }
});

app.get(ReturnPath.Products, (req: Request, res: Response) => {
  try {
    // throw new Error();
    res.status(STATUS.Ok).send(getAllProducts());
  } catch (error) {
    res.status(STATUS.BadRequest).send(error);
  }
});

app.get(ReturnPath.ProductSearch, (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;

    if (search.length <= 1) {
      throw new Error("Pesquisa tem que ter no mínimo 2 caracteres");
    }
    const result = search ? queryProductsByName(search) : getAllProducts();
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.get(ReturnPath.ProductsId, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateProductId(id)) {
      throw new Error("Produto não encontrado");
    }
    const result = getProductById(id);
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.get(ReturnPath.UsersIdPurchases, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateUserId(id)) {
      throw new Error("Usuario não encontrado");
    }
    const result = getAllPurchasesFromUserId(id);
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Users, (req: Request, res: Response) => {
  try {
    const validateUser = validaNewUser(req.body);
    if (!validateUser.bool) {
      throw new Error(validateUser.message);
    }
    const result: string = createUser(
      req.body.id,
      req.body.email,
      req.body.password
    );
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Products, (req: Request, res: Response) => {
  try {
    const validateProduct = validaNewProduct(req.body);

    if (!validateProduct.bool) {
      throw new Error(validateProduct.message);
    }
    const result: string = createProduct(
      req.body.id,
      req.body.name,
      req.body.price,
      req.body.category
    );
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Purchases, (req: Request, res: Response) => {
  try {
    const validate = validaNewPurchase(req.body);
    if (!validate.bool) {
      throw new Error(validate.message);
    }
    const result: string = createPurchase(
      req.body.userId,
      req.body.productId,
      req.body.quantity,
      req.body.totalPrice
    );
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.delete(ReturnPath.UserId, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateUserId(id)) {
      throw new Error("Usuario não encontrado");
    }
    const result = deleteUser(id);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.delete(ReturnPath.ProductsId, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateProductId(id)) {
      throw new Error("Produto não encontrado");
    }
    const result = deleteProduct(id);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.UserId, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateUserId(id)) {
      throw new Error("Usuario não encontrado");
    }
    if (!validaUser(req.body)) {
      throw new Error("Error ao editar usuario dados incompletos");
    }
    const user: User = {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
    };
    const result = editUser(user);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.ProductsId, (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!validateProductId(id)) {
      throw new Error("produto não encontrado");
    }
    if (!validaProduct(req.body)) {
      throw new Error("Error ao editar produto dados incompletos");
    }

    const product: Product = {
      id: req.body.id,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
    };
    const result = editProduct(product);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});
