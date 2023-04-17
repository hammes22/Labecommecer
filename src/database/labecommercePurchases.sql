-- Active: 1681251770912@@127.0.0.1@3306





CREATE TABLE
    purchases(
        purchaseId TEXT PRIMARY KEY NOT NULL UNIQUE,
        buyerId TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        isPaid INTEGER NOT NULL DEFAULT(0),
        Foreign Key (buyerId) REFERENCES users(id) on Delete CASCADE
    );

drop TABLE purchases;

INSERT INTO
    purchases(purchaseId, buyerId, totalPrice)
VALUES
("pu003", "u01", 168.4), ("pu004", "u01", 178.4), ("pu005", "u01", 12.4);

SELECT * FROM purchases;

DELETE FROM purchases WHERE buyer = "u01"