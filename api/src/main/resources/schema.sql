CREATE TABLE IF NOT EXISTS url (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    url VARCHAR(2083),
    short_code VARCHAR(6),
    created_at TIME WITH TIME ZONE,
    updated_at TIME WITH TIME ZONE,
    access_count INT
);