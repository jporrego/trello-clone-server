DROP DATABASE trello;
CREATE DATABASE trello;

CREATE TABLE app_user 
(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50)  NOT NULL
);

CREATE TABLE board 
(
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "name" VARCHAR(100)  NOT NULL,
  CONSTRAINT "fk_user" FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE TABLE list 
(
  "id" SERIAL PRIMARY KEY,
  "board_id" INT NOT NULL,
  "name" VARCHAR(150)  NOT NULL,
  CONSTRAINT "fk_board" FOREIGN KEY (board_id) REFERENCES board (id)
);

CREATE TABLE card 
(
  "id" SERIAL PRIMARY KEY,
  "list_id" INT NOT NULL,
  "name" VARCHAR(100)  NOT NULL,
  "description" VARCHAR(500) NOT NULL,
  CONSTRAINT "fk_list" FOREIGN KEY (list_id) REFERENCES list (id)
);

CREATE TABLE checklist 
(
  "id" SERIAL PRIMARY KEY,
  "card_id" INT NOT NULL,
  "name" VARCHAR(50)  NOT NULL,
  CONSTRAINT "fk_card" FOREIGN KEY (card_id) REFERENCES card (id)
);

CREATE TABLE checklist_item 
(
  "id" SERIAL PRIMARY KEY,
  "checklist_id" INT NOT NULL,
  "name" VARCHAR(50)  NOT NULL,
  CONSTRAINT "fk_checklist" FOREIGN KEY (checklist_id) REFERENCES checklist (id)
);

INSERT INTO app_user (name) VALUES ('Ranaflex');

INSERT INTO board (user_id, name) VALUES ('1', 'Board 1');
INSERT INTO board (user_id, name) VALUES ('1', 'Board 2');
INSERT INTO board (user_id, name) VALUES ('1', 'Board 3');


INSERT INTO list (board_id, name) VALUES ('1', 'List 1');
INSERT INTO list (board_id, name) VALUES ('1', 'List 2');
INSERT INTO list (board_id, name) VALUES ('2', 'List 1');
INSERT INTO list (board_id, name) VALUES ('2', 'List 2');
INSERT INTO list (board_id, name) VALUES ('3', 'List 1');
INSERT INTO list (board_id, name) VALUES ('3', 'List 2');
