-- Active: 1681251770912@@127.0.0.1@3306

INSERT INTO
    users(id, name, email, password)
VALUES (
        'u002',
        'user7',
        'user@email7.com',
        'password'
    );



SELECT * from users;


select id from users WHERE id = 'u01'