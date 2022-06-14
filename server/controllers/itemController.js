var Item = require("../models/item");
var Category = require("../models/category");

var async = require("async");

// Display inventory.
exports.index = function (req, res, next) {
  Item.find({}, "name price stock")
    .sort({ name: 1 })
    .populate("category")
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(result);
      res.render("index", { title: "Inventory", item_list: result });
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
      // Successful, so render.
      res.json(item);
    });
};
