CREATE TABLE articles (
    id		INT AUTO_INCREMENT,
    title	TEXT NOT NULL,
    body	LONGTEXT NOT NULL,
    author	VARCHAR(50) NOT NULL DEFAULT "MAI Youth Team",
    PRIMARY KEY (id)
);
