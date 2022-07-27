const db = require("../db");

/// USER ROUTES ///

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
    console.log(listsAndCards);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
