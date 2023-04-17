import { db } from "../database/knex";
import { MessageStatus, User } from "../types";
import { TABELA_USERS } from "../util/returnTableNames";
import { STATUS } from "../util/status";

export async function getAllUsers() {
  const users = await db("users");
  return users;
}

export async function getUserById(id: string): Promise<User> {
  try {
    const [user] = await db
      .select("*")
      .from(TABELA_USERS.USERS)
      .where({ id: id });

    if (user) {
      return user;
    } else {
      throw new Error("usuario não encontrado");
    }
  } catch (error: any) {
    error.statusCode = STATUS.BadRequest;
    throw error;
  }
}

export async function createUser(newUser: User): Promise<string> {
  const validateUser = await validaNewUser(newUser);

  if (!validateUser.bool) {
    throw new Error(validateUser.message);
  }

  await db.insert(newUser).from("users");
  return "Cadastro realizado com sucesso";
}

export async function deleteUser(id: string): Promise<MessageStatus> {
  const [userId] = await db.select("id").from("users").where({ id: id });
  if (userId) {
    await db.del().from("users").where({ id: id });
    return { message: "Usuario deletado com Sucesso", status: STATUS.Ok };
  } else {
    throw new Error("Usuario não encontrado");
  }
}

export async function editUser(editUser: User): Promise<MessageStatus> {
  const [user] = await db("users").where({ id: editUser.id });
  const newUser: User = {
    email: editUser.email || user.email,
    name: editUser.name || user.name,
    password: editUser.password || user.password,
  };

  if (user) {
    await db.update(newUser).from("users").where({ id: editUser.id });
  } else {
    throw new Error(`id: ${editUser.id} não encontrada`);
  }
  return { message: "Usuario editado com sucesso", status: STATUS.Ok };
}

export function validaUser(user: User): boolean {
  if (user.name && user.email && user.password) {
    return true;
  } else {
    return false;
  }
}

async function validaNewUser(newUser: User): Promise<{
  bool: boolean;
  message: string;
}> {
  if (!validaUser(newUser)) {
    return { bool: false, message: "Error ao criar usuario dados incompletos" };
  }
  if (await emailCadastrado(newUser.email)) {
    return { bool: false, message: "email já existe" };
  }
  return { bool: true, message: "email não existem" };
}

async function emailCadastrado(email: string): Promise<boolean> {
  const [accountEmail] = await db
    .select("email")
    .from("users")
    .where({ email: email });
  return accountEmail ? true : false;
}
