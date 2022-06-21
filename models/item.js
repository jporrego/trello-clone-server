var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  brand: { type: String, required: true, maxLength: 1000 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);
