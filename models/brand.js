var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

//Export model
module.exports = mongoose.model("Brand", BrandSchema);
