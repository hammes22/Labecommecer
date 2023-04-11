-- Active: 1680647529664@@127.0.0.1@1433

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT(1),
        Foreign Key (purchase_id) REFERENCES purchases(id),
        Foreign Key (product_id) REFERENCES products(id)
    );

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ("c001", "p01", 3), ("c001", "p02", 2), ("c001", "p03", 4);

SELECT * FROM purchases_products;

SELECT
    purchases_products.purchase_id AS "N° do pedido",
    purchases_products.quantity AS "quantidade",
    products.name AS "Descrição do Produto",
    products.price AS "Preço do produto"
FROM purchases_products
    INNER JOIN
    purchases,
    products
    ON purchases_products.purchase_id = purchases.id
    AND purchases_products.product_id = products.id;

