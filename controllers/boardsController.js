const db = require("../db");

// Respond with single user.
exports.boards = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM board");
  console.log(rows);
  res.status(200).json(rows);
};

exports.board_detail = async (req, res, next) => {
  const { boardId } = req.params;
  const { rows } = await db.query("SELECT * FROM board WHERE id = $1", [
    boardId,
  ]);
  res.status(200).json(rows);
};

exports.board_lists = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { rows } = await db.query("SELECT * FROM list WHERE board_id = $1", [
      boardId,
    ]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.send(500);
  }
};

exports.board_lists_order = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    let listsOrder = await db.query(
      "SELECT list_order FROM board_lists_order WHERE board_id = $1",
      [boardId]
    );
    if (listsOrder.rows[0] !== undefined) {
      listsOrder = listsOrder.rows[0].list_order;
      res.status(200).json(listsOrder);
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

exports.update_board_lists_order = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { card_order } = req.body;
    console.log(listId, card_order);
    await db.query(
      "UPDATE list_cards_order SET cards_order = $1 WHERE list_id = $2",
      [card_order, listId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

exports.OUTDATED_board_lists_and_cards = async (req, res, next) => {
  /// Taking the boardId, get all the lists. Then for each list get its cards.
  // This is done this way to get all the info in one request.

  try {
    const { boardId } = req.params;
    const listsAndCards = {
      lists: [],
      cards: [],
    };

    const { rows } = await db.query("SELECT * FROM list WHERE board_id = $1", [
      boardId,
    ]);
    listsAndCards.lists = rows;

    for (const list of rows) {
      const query = await db.query("SELECT * FROM card WHERE list_id = $1", [
        list.id,
      ]);
      const cards = query.rows;
      if (cards.length > 0) {
        for (const card of cards) {
          listsAndCards.cards.push(card);
        }
      }
    }

    res.status(200).json(listsAndCards);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
