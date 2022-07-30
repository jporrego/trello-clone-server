const db = require("../db");

exports.add_card = async (req, res, next) => {
  try {
    const { list_id, cardName, cardDescription } = req.body;
    await db.query(
      "INSERT INTO card (list_id, name, description) VALUES ($1, $2, $3)",
      [list_id, cardName, cardDescription]
    );
    console.log(cardName);
    const queryNewId = await db.query("SELECT currval('card_id_seq')");
    const newCardId = queryNewId.rows[0].currval;

    const queryNewCard = await db.query("SELECT * FROM card WHERE id = $1", [
      newCardId,
    ]);
    const newCard = queryNewCard.rows;

    console.log(newCard);
    res.status(200).json(newCard);
  } catch (error) {
    res.send(500);
  }
};

exports.delete_card = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    console.log(cardId);
    await db.query("DELETE FROM card WHERE id = $1", [cardId]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
