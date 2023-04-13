-- Active: 1681251770912@@127.0.0.1@3306

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        paid INTEGER NOT NULL DEFAULT(0),
        Foreign Key (buyer) REFERENCES users(id) on Delete CASCADE
    );

drop TABLE purchases;

INSERT INTO
    purchases(id, buyer, total_price)
VALUES
("c003", "u01", 168.4), ("c004", "u01", 178.4), ("c005", "u01", 12.4);

SELECT * FROM purchases;

DELETE FROM purchases WHERE buyer = "u01"