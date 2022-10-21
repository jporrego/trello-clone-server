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
  "name" VARCHAR(100)  NOT NULL
);

CREATE TABLE board_lists_order  
(
  "id" SERIAL PRIMARY KEY,
  "board_id" INT NOT NULL,
  "list_order" INT[],
  CONSTRAINT "fk_board" FOREIGN KEY (board_id) REFERENCES board (id)
);

CREATE TABLE list 
(
  "id" SERIAL PRIMARY KEY,
  "board_id" INT NOT NULL,
  "name" VARCHAR(150)  NOT NULL,
  "cards_order" INT[],
  CONSTRAINT "fk_board" FOREIGN KEY (board_id) REFERENCES board (id)
);

CREATE TABLE list_cards_order  
(
  "id" SERIAL PRIMARY KEY,
  "list_id" INT NOT NULL,
  "cards_order" INT[],
  CONSTRAINT "fk_list" FOREIGN KEY (list_id) REFERENCES list (id)
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

/*INSERT INTO app_user (name) VALUES ('Ranaflex');*/

INSERT INTO board (user_id, name) VALUES ('2x0rxbeXqSXapWp5xPkPyTQL5hi2', 'Board 1');
INSERT INTO board_lists_order (board_id ) SELECT currval('board_id_seq');
INSERT INTO board (user_id, name) VALUES ('2x0rxbeXqSXapWp5xPkPyTQL5hi2', 'Board 2');
INSERT INTO board_lists_order (board_id ) SELECT currval('board_id_seq');
INSERT INTO board (user_id, name) VALUES ('2x0rxbeXqSXapWp5xPkPyTQL5hi2', 'Board 3');
INSERT INTO board_lists_order (board_id ) SELECT currval('board_id_seq');


INSERT INTO list (board_id, name) VALUES ('1', 'List 1');
INSERT INTO list_cards_order (list_id) SELECT currval('list_id_seq');
INSERT INTO list (board_id, name) VALUES ('1', 'List 2');
INSERT INTO list_cards_order (list_id) SELECT currval('list_id_seq');

INSERT INTO card (list_id, name, description) VALUES ('2', 'Card 1', 'Tesing card functionality');
/*
UPDATE list
SET cards_order = cards_order || SELECT currval('card_id_seq'),
WHERE id = 2;
ignore this line
*/
INSERT INTO card (list_id, name, description) VALUES ('2', 'Card 2','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('3', 'Card 1','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('3', 'Card 2','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('4', 'Card 1', 'Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('4', 'Card 2','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('5', 'Card 1','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('5', 'Card 2','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('6', 'Card 1', 'Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('6', 'Card 2','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('7', 'Card 1','Tesing card functionality');
INSERT INTO card (list_id, name, description) VALUES ('7', 'Card 2','Tesing card functionality');
