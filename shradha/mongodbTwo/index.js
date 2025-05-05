const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connected Successfully!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

//This a schema for the user collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// This is a model for the user collection
const User = mongoose.model("User", userSchema);

//inserting a documents in the User model/collection
// const user1 = new User({
//   name: "Adam",
//   email: "adam@yahoo.in",
//   age: 48,
// });
// const user2 = new User({
//   name: "Eve",
//   email: "Eve@yahoo.in",
//   age: 48,
// });

// user1.save();
// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//inserting multiple documents in the User model/collection
// User.insertMany([
//   {
//     name: "firferey",
//     email: "firferey@example.com",
//     age: 25,
//   },
//   {
//     name: "sheru",
//     email: "sheru@example.com",
//     age: 30,
//   },
//   {
//     name: "sheru",
//     email: "sheru@example.com",
//     age: 30,
//   },
// ])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// User.find({age: {$gt: 30}})
//   .then((res) => {
//     console.log(res[0].name);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//user.find({})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// User.findByIdAndUpdate("64b0c4f1d2e3f8a5c8b0c4f1", { age: 35 }, { new: true })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
User.updateOne({ name: "Adam" }, { name: "Brue" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
