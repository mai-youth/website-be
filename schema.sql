CREATE TABLE articles (
    id          INT AUTO_INCREMENT,
    title       TEXT NOT NULL,
    body        LONGTEXT NOT NULL,
    author      VARCHAR(50) NOT NULL DEFAULT "MAI Youth Team",
    likes       INT DEFAULT 0,
    views       INT DEFAULT 0,
    color       VARCHAR(20) DEFAULT "#5e9de6",
    created_at  TIMESTAMP DEFAULT NOW(), 
    updated_at  TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id)
);
