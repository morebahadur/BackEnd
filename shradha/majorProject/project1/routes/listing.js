const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

//validating the schema
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log(errMsg);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

//this is our index route
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});
//New post
router.get("/new", async (req, res) => {
  res.render("listings/new");
});

//create the new post
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
}));

//show particular id detail
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing){
    req.flash("error","Listing you requested for not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing: listing });
});

//edit the post
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing.image.url);
  if(!listing) {
    req.flash("error", "Listing you requested for not found for edit!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
});

//update the post
router.put("/:id", validateListing, async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  req.flash("success", "updated the listing!");
  res.redirect("/listings");
});
//delete the post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id, req.body.listing);
  req.flash("success", "deleted the listing!");
  res.redirect("/listings");
});

module.exports = router;