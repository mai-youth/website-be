CREATE TABLE articles (
    id		    INT AUTO_INCREMENT,
    title	    TEXT NOT NULL,
    body	    LONGTEXT NOT NULL,
    author	    VARCHAR(50) NOT NULL DEFAULT "MAI Youth Team",
    likes       INT DEFAULT,
    views       INT DEFAULT,
    color       VARCHAR(20),
    created_at  TIMESTAMP DEFAULT NOW(), 
    updated_at  TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id)
);
