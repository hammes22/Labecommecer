import { db } from "../database/knex";
import { MessageStatus, User } from "../types";
import { TABELA_USERS } from "../util/returnTableNames";
import { STATUS } from "../util/status";

export async function getAllUsers() {
  const users = await db(TABELA_USERS.Users).select(
    TABELA_USERS.Users_Id,
    TABELA_USERS.Name,
    TABELA_USERS.Email,
    TABELA_USERS.Password,
    TABELA_USERS.CreatedAt
  );
  return users;
}

export async function createUser(newUser: User): Promise<string> {
  try {
    validaUser(newUser);
    await emailCadastrado(newUser.email);
    await db.insert(newUser).from(TABELA_USERS.Users);
    return "Cadastro realizado com sucesso";
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const [user] = await db
      .select("*")
      .from(TABELA_USERS.Users)
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

export function validaUser(user: User) {
  try {
    if (!user.name) {
      throw new Error("Nome de usuario invalido");
    }
    if (!user.email) {
      throw new Error("E-mail invalido");
    }
    if (!user.password) {
      throw new Error("password de usuario invalido");
    }
  } catch (error: any) {
    error.statusCode
      ? error.statusCode
      : (error.statusCode = STATUS.BadRequest);
    throw error;
  }
}

export async function emailCadastrado(email: string) {
  try {
    const [accountEmail] = await db
      .select(TABELA_USERS.Email)
      .from(TABELA_USERS.Users)
      .where({ email: email });
    if (accountEmail) {
      throw new Error(`Email: ${email} já existe tente outro email`);
    }
    return;
  } catch (error: any) {
    throw error;
  }
}
