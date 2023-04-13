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
  validaUser,
  validateUserId,
} from "./manages/userManage";

import {
  createPurchase,
  getAllPurchasesFromUserId,
  validaNewPurchase,
} from "./manages/purchasesManage";
import { Product, User } from "./types";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  validaProduct,
  validateProductId,
} from "./manages/productManage";

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
    const validateUser = await validaNewUser(req.body);

    if (await !validateUser.bool) {
      throw new Error(validateUser.message);
    }
    const result: string = await createUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.status(STATUS.Created).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.UserId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!(await validateUserId(id))) {
      throw new Error("Usuario não encontrado");
    }
    const user: User = {
      id: id,
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
  try {
    const id = req.params.id;
    if (!(await validateUserId(id))) {
      throw new Error("Usuario não encontrado");
    }
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
    const result = search
      ? await queryProductsByName(search)
      : await getAllProducts();
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.get(ReturnPath.ProductsId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!(await validateProductId(id))) {
      throw new Error("Produto não encontrado");
    }
    const result = await getProductById(id);
    res.status(STATUS.Ok).send(result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.post(ReturnPath.Products, async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
    };

    const validateProduct = validaProduct(product);

    if (!validateProduct.bool) {
      throw new Error(validateProduct.message);
    }
    const result: Promise<string> = createProduct(product);
    res.status(STATUS.Created).send(await result);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

app.put(ReturnPath.ProductsId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!(await validateProductId(id))) {
      throw new Error("produto não encontrado");
    }
    const product: Product = {
      id: id,
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
    const id = req.params.id;
    if (!(await validateProductId(id))) {
      throw new Error("Produto não encontrado");
    }
    const result = await deleteProduct(id);
    res.status(result.status).send(result.message);
  } catch (error: any) {
    res.status(STATUS.BadRequest).send(error.message);
  }
});

//Purchases

// app.post(ReturnPath.Purchases, (req: Request, res: Response) => {
//   try {
//     const validate = validaNewPurchase(req.body);
//     if (!validate.bool) {
//       throw new Error(validate.message);
//     }
//     const result: string = createPurchase(
//       req.body.userId,
//       req.body.productId,
//       req.body.quantity,
//       req.body.totalPrice
//     );
//     res.status(STATUS.Created).send(result);
//   } catch (error: any) {
//     res.status(STATUS.BadRequest).send(error.message);
//   }
// });

// app.get(ReturnPath.UsersIdPurchases, async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     if (!validateUserId(id)) {
//       throw new Error("Usuario não encontrado");
//     }
//     const result = await getAllPurchasesFromUserId(id);
//     res.status(STATUS.Ok).send(result);
//   } catch (error: any) {
//     res.status(STATUS.BadRequest).send(error.message);
//   }
// });
