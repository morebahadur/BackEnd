const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://unsplash.com/photos/nighttime-street-scene-of-a-japanese-restaurant-Ea2q-D6DzDY",
      set: (v) => v === "" ? "https://unsplash.com/photos/nighttime-street-scene-of-a-japanese-restaurant-Ea2q-D6DzDY" : v,
    }
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
