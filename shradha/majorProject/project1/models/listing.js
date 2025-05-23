const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }]
});
listingSchema.post('findOneAndDelete', async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: {
        $in: listing.reviews
      }
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
