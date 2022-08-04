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

    let cardsOrder = await db.query(
      "SELECT cards_order FROM list_cards_order WHERE list_id = $1",
      [listId]
    );

    cardsOrder = cardsOrder.rows[0].cards_order;
    if (cardsOrder) {
      const cardsById = cardsOrder.map((id) => rows.find((c) => c.id === id));
      res.status(200).json(cardsById);
    } else {
      res.status(200).json(rows);
    }
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
    await db.query(
      "INSERT INTO list_cards_order (list_id) SELECT currval('list_id_seq')"
    );

    // Get list order and add new list id to it.
    let newListId = await db.query("SELECT currval('list_id_seq')");
    newListId = newListId.rows[0].currval;

    let listOrder = await db.query(
      "SELECT list_order FROM board_lists_order WHERE board_id = $1",
      [board_id]
    );

    listOrder = listOrder.rows[0].list_order;
    if (listOrder !== null) {
      listOrder.push(parseInt(newListId));
    } else {
      listOrder = [parseInt(newListId)];
    }

    await db.query(
      "UPDATE board_lists_order SET list_order = $1 WHERE board_id = $2",
      [listOrder, board_id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.send(500);
    console.log(error);
  }
};

exports.list_cards_order = async (req, res, next) => {
  try {
    const { listId } = req.params;
    let cardsOrder = await db.query(
      "SELECT cards_order FROM list_cards_order WHERE list_id = $1",
      [listId]
    );
    if (cardsOrder.rows[0] !== undefined) {
      cardsOrder = cardsOrder.rows[0].cards_order;
      res.status(200).json(cardsOrder);
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

exports.update_list_cards_order = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { card_order } = req.body;

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

// DELETE list
exports.delete_list = async (req, res, next) => {
  try {
    const { listId } = req.params;

    await db.query("DELETE FROM card WHERE list_id = $1", [listId]);
    await db.query("DELETE FROM list_cards_order WHERE list_id = $1", [listId]);

    // Get board id, use it to get list order,
    // remove the listId from the list order, updated it and then delete the list.
    let boardId = await db.query("SELECT board_id FROM list WHERE id = $1", [
      listId,
    ]);
    boardId = boardId.rows[0].board_id;

    let listOrder = await db.query(
      "SELECT list_order FROM board_lists_order WHERE board_id = $1",
      [boardId]
    );
    listOrder = listOrder.rows[0].list_order;
    listOrder = listOrder.filter((id) => id !== parseInt(listId));
    await db.query(
      "UPDATE board_lists_order SET list_order = $1 WHERE board_id = $2",
      [listOrder, boardId]
    );

    await db.query("DELETE FROM list WHERE id = $1", [listId]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};
