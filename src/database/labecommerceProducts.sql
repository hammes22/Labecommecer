-- Active: 1680647529664@@127.0.0.1@1433

CREATE TABLE
    products(
        id TEXT PRIMARY key UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products(
        id,
        name,
        price,
        description,
        image_url,
        category
    )
VALUES (
        "p01",
        "camiseta preta",
        52.99,
        "camiseta de algodão",
        "https://cdn.awsli.com.br/600x700/236/236627/produto/964395465ea3a25973.jpg",
        "camisetas"
    ), (
        "p02",
        "vestido de bolinha",
        89.99,
        "vestido preto com bolinhas brancas",
        "https://http2.mlstatic.com/D_NQ_NP_663984-MLB31327353986_072019-O.jpg",
        "vestidos"
    ), (
        "p03",
        "calça deans",
        77.99,
        "calças deans preta g",
        "https://images.tcdn.com.br/img/img_prod/762869/calca_jeans_feminina_mom_candy_2915_1_d4da38dda9a68f4486d9653a70cf9282.jpg",
        "calça"
    ), (
        "p04",
        "camiseta estampada",
        92.99,
        "camiseta seu madruga",
        "https://44721.cdn.simplo7.net/static/44721/galeria/165514078992788.jpg",
        "camisetas"
    ), (
        "p05",
        "vestido de bolinha",
        152.99,
        "vestido bolinha vermelho",
        "https://cdn.shopify.com/s/files/1/0579/2494/4070/products/vestido_longo_de_bolinha_vermelho_manda_curta_9_650x.jpg?v=1626664747",
        "vestidos"
    );

DELETE FROM products WHERE id = "p05";

UPDATE products SET name="Camiseta branca" WHERE id = "p01";

SELECT * FROM products WHERE id = "p03";

SELECT * FROM products;

SELECT * FROM products ORDER BY price ASC LIMIT 20 offset 0;

SELECT *
FROM products
WHERE price > 50 AND price < 85
ORDER BY price ASC
LIMIT 20
offset 0;

SELECT * From products WHERE name LIKE "vestido de bolinha";