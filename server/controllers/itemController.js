var Item = require("../models/item");
var Category = require("../models/category");

var async = require("async");

// Display inventory.
exports.index = function (req, res, next) {
  Item.find({}, "name price stock img")
    .sort({ name: 1 })
    .populate("category")
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
};

exports.item_detail = function (req, res, next) {
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

exports.item_create_post = function (req, res, next) {
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
