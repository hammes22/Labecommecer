-- Active: 1679962326351@@127.0.0.1@3306

--Users

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

DROP TABLE users;

INSERT INTO
    users(id, email, password)
VALUES (
        "u01",
        "user001@email.com",
        "password"
    ), (
        "u02",
        "user002@email.com",
        "password"
    ), (
        "u03",
        "user003@email.com",
        "password"
    );

-- Products

CREATE TABLE
    products(
        id TEXT PRIMARY key UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        car enum("camisa", "vestido",)
    );

SELECT * FROM products;

INSERT INTO
    products(id, name, price, category)
VALUES (
        "p01",
        "camiseta preta",
        52.99,
        "camisetas"
    ), (
        "p02",
        "vestido de bolinha",
        89.99,
        "vestidos"
    ), (
        "p03",
        "calça deans",
        77.99,
        "calça"
    ), (
        "p04",
        "camiseta estampada",
        92.99,
        "camisetas"
    ), (
        "p05",
        "vestido de bolinha",
        152.99,
        "vestidos"
    );

--

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20 offset 0;

SELECT *
FROM products
WHERE price > 50 AND price < 85
ORDER BY price ASC
LIMIT 20
offset 0;

SELECT * From products WHERE name LIKE "vestido de bolinha";

INSERT INTO
    users(id, email, password)
VALUES (
        "u04",
        "user004@email.com",
        "password"
    );

--;;

INSERT INTO
    products(id, name, price, category)
VALUES (
        "p06",
        "calça social",
        89.90,
        "calça"
    );

--

DELETE FROM users WHERE id = "u02";

SELECT * FROM products WHERE id = "p03";

DELETE FROM products WHERE id = "p05";

UPDATE users SET password="newPassword" WHERE id = "u04";

UPDATE products SET name="Camiseta branca" WHERE id = "p01";