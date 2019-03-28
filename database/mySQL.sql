CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255),
    age INT,
    privacy BOOLEAN DEFAULT false,
    boolValue BOOLEAN DEFAULT false,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    sign_up_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE = InnoDB;

CREATE TABLE events(
    wit_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40),
    wit VARCHAR(255),
    boolValue BOOLEAN DEFAULT false,
    boolValueUser BOOLEAN DEFAULT false,
    numOfLikes INT DEFAULT 0,
    numOfReplies INT DEFAULT 0,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
    	ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE likes(
 	like_id INT PRIMARY KEY AUTO_INCREMENT,
    wit_id INT NOT NULL,
    username VARCHAR(40),
    image VARCHAR(255),
	FOREIGN KEY (wit_id)
		REFERENCES events (wit_id)
		ON DELETE CASCADE,
	FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
    	ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE replies(
	reply_id INT PRIMARY KEY AUTO_INCREMENT,
    wit_id INT NOT NULL,
    username VARCHAR(40),
    reply VARCHAR(255),
    image VARCHAR(255),
    boolValue BOOLEAN DEFAULT false,
    numOfLikes INT DEFAULT 0,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wit_id)
		REFERENCES events (wit_id)
		ON DELETE CASCADE,
	FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE follower(
	fol_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40),
    follow_name VARCHAR(40),
    FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
   		ON UPDATE CASCADE,
	FOREIGN KEY (follow_name)
		REFERENCES users (username)
		ON DELETE CASCADE
   		ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE following(
fol_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40),
    follow_name VARCHAR(40),
    FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
    	ON UPDATE CASCADE,
	FOREIGN KEY (follow_name)
		REFERENCES users (username)
		ON DELETE CASCADE
    	ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE replyLikes(
 	like_id INT PRIMARY KEY AUTO_INCREMENT,
    reply_id INT NOT NULL,
    username VARCHAR(40),
    image VARCHAR(255),
	FOREIGN KEY (reply_id)
		REFERENCES replies (reply_id)
		ON DELETE CASCADE,
	FOREIGN KEY (username)
		REFERENCES users (username)
		ON DELETE CASCADE
    	ON UPDATE CASCADE
)ENGINE=InnoDB;