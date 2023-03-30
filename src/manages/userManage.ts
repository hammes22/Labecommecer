import { MessageStatus, User } from "../types";
import { STATUS } from "../util/status";

const users: User[] = [
  {
    id: "001",
    email: "user001@email.com",
    password: "password",
  },
  {
    id: "002",
    email: "user002@email.com",
    password: "password",
  },
  {
    id: "003",
    email: "user003@email.com",
    password: "password",
  },
];

export function getAllUsers() {
  return users;
}
export function createUser(
  id: string,
  email: string,
  password: string
): string {
  const newUser: User = {
    id,
    email,
    password,
  };
  users.push(newUser);
  return "Cadastro realizado com sucesso";
}

export function deleteUser(id: string): MessageStatus {
  const accountIndex = users.findIndex((user) => {
    return user.id === id;
  });
  if (accountIndex > -1) {
    users.splice(accountIndex, 1);
    return { message: "Usuario deletado com Sucesso", status: STATUS.Ok };
  } else {
    return {
      message: "usuario não encontrado",
      status: STATUS.UnprocessableEntity,
    };
  }
}

export function editUser(editUser: User): MessageStatus {
  const accountIndex = users.findIndex((user) => {
    return user.id === editUser.id;
  });

  if (accountIndex > -1) {
    users.forEach((user) => {
      if (user.id === editUser.id) {
        user.email = editUser.email;
        user.password = editUser.password;
      }
    });
    return { message: "Usuario editado com sucesso", status: STATUS.Ok };
  } else {
    return {
      message: "Usuario não encontrado",
      status: STATUS.UnprocessableEntity,
    };
  }
}

export function validaUser(user: User): boolean {
  if (user.id && user.email && user.password) {
    return true;
  } else {
    return false;
  }
}
export function validaNewUser(newUser: User): {
  bool: boolean;
  message: string;
} {
  if (!validaUser(newUser)) {
    return { bool: false, message: "Error ao criar usuario dados incompletos" };
  }
  const accountIndexId = users.find((user) => {
    return user.id === newUser.id;
  });
  const accountIndexEmail = users.find((user) => {
    return user.email === newUser.email;
  });
  if (accountIndexId && accountIndexEmail) {
    return { bool: false, message: "Id e email já existe" };
  } else if (accountIndexId) {
    return { bool: false, message: "Id já existe" };
  } else if (accountIndexEmail) {
    return { bool: false, message: "email já existe" };
  } else {
    return { bool: true, message: "id e email não existem" };
  }
}

export function validateUserId(id: string): boolean {
  const accountIndex = users.findIndex((user) => {
    return user.id === id;
  });
  return accountIndex > -1;
}
