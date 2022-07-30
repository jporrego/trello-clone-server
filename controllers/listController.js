const db = require("../db");

// Respond with single user.
exports.lists = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM list");
  console.log(rows);
  res.status(200).json(rows);
};

// GET cards for a list
exports.list_cards = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { rows } = await db.query("SELECT * FROM card WHERE list_id = $1", [
      listId,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.send(500);
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
