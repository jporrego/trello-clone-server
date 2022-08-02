const db = require("../db");

// Respond with single user.
exports.lists = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM list");
  res.status(200).json(rows);
};

// GET cards for a list
exports.list_cards = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { rows } = await db.query("SELECT * FROM card WHERE list_id = $1", [
      listId,
    ]);

    // Get card order and add new card id to it.

    let cardsOrder = await db.query(
      "SELECT cards_order FROM list WHERE id = $1",
      [listId]
    );
    cardsOrder = cardsOrder.rows[0].cards_order;
    const cardsById = cardsOrder.map((id) => rows.find((c) => c.id === id));
    console.log(cardsOrder, cardsById);

    res.status(200).json(cardsById);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// POST | Add list
exports.add_list = async (req, res, next) => {
  try {
    const { board_id, listName } = req.body;
    await db.query("INSERT INTO list (board_id, name) VALUES ($1, $2)", [
      board_id,
      listName,
    ]);
    /*
    const queryNewId = await db.query("SELECT currval('card_id_seq')");
    const newCardId = queryNewId.rows[0].currval;

    const queryNewCard = await db.query("SELECT * FROM card WHERE id = $1", [
      newCardId,
    ]);
    const newCard = queryNewCard.rows;

    console.log(newCard);*/
    console.log(1);
    res.sendStatus(200);
  } catch (error) {
    res.send(500);
  }
};

exports.list_cards_order = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { card_order } = req.body;
    console.log(card_order);
    await db.query("UPDATE list SET cards_order = $1 WHERE id = $2", [
      card_order,
      listId,
    ]);
    /*
    const queryNewId = await db.query("SELECT currval('card_id_seq')");
    const newCardId = queryNewId.rows[0].currval;

    const queryNewCard = await db.query("SELECT * FROM card WHERE id = $1", [
      newCardId,
    ]);
    const newCard = queryNewCard.rows;

    console.log(newCard);*/
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};
