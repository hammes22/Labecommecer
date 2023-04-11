-- Active: 1680647529664@@127.0.0.1@1433

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        paid INTEGER NOT NULL DEFAULT(0),
        Foreign Key (buyer) REFERENCES users(id)
    );

INSERT INTO
    purchases(id, buyer, total_price)
VALUES("c001", "u01", 168.4);

SELECT * FROM purchases;