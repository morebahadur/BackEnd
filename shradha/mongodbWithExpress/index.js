const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// const chat = new Chat({
//   from: "Shradha",
//   to: "Shivam",
//   message: "Hello",
//   created_at: new Date(),
// });
// chat.save().then((res) => {
//     console.log(res);
//   console.log("database is being created!");
// }).catch((err) => {
//   console.log("Error saving chat:", err);
// });

app.get("/", (req, res) => {
  res.send("root is working!");
});

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  }
}

//showing chats Route
app.get("/chats", asyncWrap(async (req, res) => {
  const chats = await Chat.find();
  res.render("chats.ejs", { chats });
}));

//creating new chat Route
app.get("/chats/new", (req, res) => {
  res.render("newChat");
});
app.post("/chats", (req, res) => {
  const { from, to, message } = req.body;
  const newChat = new Chat({
    from,
    to,
    message,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("Chat saved successfully!");
    })
    .catch((err) => {
      console.log("Error saving chat:", err);
    });
  res.redirect("/chats");
});

//edit message route
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("editChat", { chat });
});
//update message
app.put("/chats/:_id", async (req, res) => {
  const { _id: id } = req.params;
  console.log(id);
  const { message: newMsg } = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:_id", async (req, res) => {
  const { _id: id } = req.params;
  const deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
