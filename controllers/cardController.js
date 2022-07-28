const db = require("../db");

/// USER ROUTES ///

// Respond with single user.
exports.add_card = async (req, res, next) => {
  try {
    //const { rows } = await db.query("SELECT * FROM board");
    //console.log(rows);
    //res.status(200).json(rows);
    const { list_id, cardName, cardDescription } = req.body;
    await db.query(
      "INSERT INTO card (list_id, name, description) VALUES ($1, $2, $3)",
      [list_id, cardName, cardDescription]
    );
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
