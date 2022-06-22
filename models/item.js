var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String, required: true, maxLength: 1000 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);
