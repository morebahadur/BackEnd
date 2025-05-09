const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then((res) => {
    console.log("dbs connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res) => {
  res.send("I am root.");
});

//this is our index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});
//New post
app.get("/listings/new", async (req, res) => {
  res.render("listings/new");
});
//create the new post
app.post("/listings", async (req, res) => {
  // console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//show particular id detail
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing: listing });
});

//edit the post
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing.image.url);
  res.render("listings/edit", { listing });
});

//update the post
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect("/listings");
});
//delete the post
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id, req.body.listing);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "Near by the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India"
//   });
//   await sampleListing.save();
//   console.log("sample was saved!");
//   res.send("successful test");
// });

app.listen(8080, (req, res) => {
  console.log("i am listenning port 8080!");
});
