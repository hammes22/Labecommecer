-- Active: 1681251770912@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );

DROP TABLE users;

INSERT INTO
    users(id, name, email, password)
VALUES (
        "u01",
        "userName001",
        "user001@email.com",
        "password"
    ), (
        "u02",
        "userName002",
        "user002@email.com",
        "password"
    ), (
        "u03",
        "userName003",
        "user003@email.com",
        "password"
    );

DELETE FROM users WHERE id = "u01";

UPDATE users SET password="newPassword" WHERE id = "u04";

SELECT * FROM users;

SELECT * FROM users ORDER BY email ASC;

select *
from users
    INNER JOIN purchases, purchases_Products on users.id = purchases.buyer and purchases.id = purchases_Products.purchase_id
    INNER JOIN products ON products.id = purchases_Products.product_id;

SELECT
    users.id as "código usuario",
    users.name,
    purchases.id as "N° pedido",
    purchases.total_price as "total do pedido",
    products.name as "Produtos",
    -- products.price as "Valor Unitário",
    purchases_products.quantity as "quantidade"
FROM users
    INNER JOIN purchases, purchases_products, products on users.id = purchases.buyer AND purchases_products.product_id = products.id;



select email from users WHERE email = "user004@email.com"

