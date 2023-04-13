import { db } from "../database/knex";
import { MessageStatus, User } from "../types";
import { STATUS } from "../util/status";


export async function getAllUsers() {
  const users = await db.raw(` SELECT * FROM users `);
  return users;
}
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<string> {
  console.log(name, email, password);

  await db.raw(`
  INSERT INTO users(id, name, email, password)
VALUES (
  '${Math.floor(Date.now() * Math.random()).toString(36)}',
  '${name}',
  '${email}',
  '${password}'
    );
  `);
  return "Cadastro realizado com sucesso";
}

export async function deleteUser(id: string): Promise<MessageStatus> {
  await db.raw(`DELETE FROM users WHERE id = '${id}';`);
  return { message: "Usuario deletado com Sucesso", status: STATUS.Ok };
}

export async function editUser(editUser: User): Promise<MessageStatus> {
  const [user] = await await db.raw(
    `select * from  users
   WHERE id = '${editUser.id}';`
  );
  const name = editUser.name ? editUser.name : user.name;
  const email = editUser.email ? editUser.email : user.email;
  const password = editUser.password ? editUser.password : user.password;

  console.log(user);
  await db.raw(
    `UPDATE users SET
     name = '${name}',
    email = '${email}',
    password = '${password}'
     WHERE id = '${editUser.id}';`
  );
  return { message: "Usuario editado com sucesso", status: STATUS.Ok };
}

export async function validaUser(user: User): Promise<boolean> {
  if (user.name && user.email && user.password) {
    return true;
  } else {
    return false;
  }
}

export async function validaNewUser(newUser: User): Promise<{
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
  const accountEmail = await db.raw(
    `select email from users WHERE email = '${email}'`
  );
  return accountEmail.length > 0 ? true : false;
}

export async function validateUserId(id: string): Promise<boolean> {
  console.log(id);
  const accountId = await db.raw(`select id from users WHERE id = '${id}'`);
  console.log(accountId);

  return accountId.length > 0 ? true : false;
}
