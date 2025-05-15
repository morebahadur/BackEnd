const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String,
      required: true,
      default: "https://unsplash.com/photos/nighttime-street-scene-of-a-japanese-restaurant-Ea2q-D6DzDY",
      set: (v) => v === "" ? "https://unsplash.com/photos/nighttime-street-scene-of-a-japanese-restaurant-Ea2q-D6DzDY" : v,
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
