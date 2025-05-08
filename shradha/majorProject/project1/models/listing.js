const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: { type: String, required: true },
  descript: { type: String, required: true },
  image: String,
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
modules.export = Listing;
