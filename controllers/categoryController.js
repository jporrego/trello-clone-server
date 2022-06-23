var Item = require("../models/item");
var Category = require("../models/category");

var async = require("async");

// Display inventory.
exports.category_list = function (req, res, next) {
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
};

exports.category_detail = function (req, res, next) {
  Category.findById(req.params.id).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result == null) {
      // No results.
      var err = new Error("Item");
      err.status = 404;
      return next(err);
    }
    // Successful, so send data.
    res.json(result);
  });
};

exports.category_detail_by_name = function (req, res, next) {
  Category.findOne({ name: req.params.name }).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result == null) {
      // No results.
      res.sendStatus(204);
      return;
    }
    res.json(result);
  });
};

exports.category_create_post = async function (req, res, next) {
  try {
    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();
    if (existingCategory !== null) {
      res.sendStatus(409);
    } else {
      let category = new Category({
        name: req.body.name,
      });
      category.save();
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};

/*exports.item_create_post = function (req, res, next) {
  let item = new Item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    img: req.body.img,
  });
  Item.findById(req.params.id)
    .populate("category")
    .exec(function (err, item) {
      if (err) {
        return next(err);
      }
      if (item == null) {
        // No results.
        var err = new Error("Item");
        err.status = 404;
        return next(err);
      }
      // Successful, so send data.
      res.json(item);
    });
};
*/
