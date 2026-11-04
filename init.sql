CREATE TABLE IF NOT EXISTS url (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    url VARCHAR(2083),
    short_code VARCHAR(64),
    created_at DATETIME,
    updated_at DATETIME,
    access_count INT
);