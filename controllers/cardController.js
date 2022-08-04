const e = require("express");
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
      "SELECT cards_order FROM list_cards_order WHERE list_id = $1",
      [list_id]
    );

    cardOrder = cardOrder.rows[0].cards_order;
    if (cardOrder !== null) {
      cardOrder.push(parseInt(newCardId));
    } else {
      cardOrder = [parseInt(newCardId)];
    }
    console.log(cardOrder);

    await db.query(
      "UPDATE list_cards_order SET cards_order = $1 WHERE list_id = $2",
      [cardOrder, list_id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.delete_card = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    // Get list id, use it to get card order,
    // remove the cardId from the card order, updated it and then delete the card.

    let listId = await db.query("SELECT list_id FROM card WHERE id = $1", [
      cardId,
    ]);
    listId = listId.rows[0].list_id;

    let cardsOrder = await db.query(
      "SELECT cards_order FROM list_cards_order WHERE list_id = $1",
      [listId]
    );
    cardsOrder = cardsOrder.rows[0].cards_order;
    cardsOrder = cardsOrder.filter((id) => id !== parseInt(cardId));

    await db.query(
      "UPDATE list_cards_order SET cards_order = $1 WHERE list_id = $2",
      [cardsOrder, listId]
    );
    await db.query("DELETE FROM card WHERE id = $1", [cardId]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
