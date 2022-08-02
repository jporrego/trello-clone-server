const db = require("../db");

exports.add_card = async (req, res, next) => {
  try {
    const { list_id, cardName, cardDescription } = req.body;
    await db.query(
      "INSERT INTO card (list_id, name, description) VALUES ($1, $2, $3)",
      [list_id, cardName, cardDescription]
    );

    const queryNewId = await db.query("SELECT currval('card_id_seq')");
    const newCardId = queryNewId.rows[0].currval;

    // Get card order and add new card id to it.

    let cardOrder = await db.query(
      "SELECT cards_order FROM list WHERE id = $1",
      [list_id]
    );

    cardOrder = cardOrder.rows[0].cards_order;
    cardOrder.push(newCardId);
    await db.query("UPDATE list SET cards_order = $1 WHERE id = $2", [
      cardOrder,
      list_id,
    ]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.delete_card = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    await db.query("DELETE FROM card WHERE id = $1", [cardId]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
