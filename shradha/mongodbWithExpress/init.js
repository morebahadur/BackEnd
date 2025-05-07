const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
const AllChat = [
  {
    from: "Shradha",
    to: "Shivam",
    message: "Hello",
    created_at: new Date(),
  },
  {
    from: "Shivam",
    to: "Shradha",
    message: "Hi",
    created_at: new Date(),
  },
  {
    from: "Shradha",
    to: "Shivam",
    message: "How are you?",
    created_at: new Date(),
  },
  {
    from: "Shivam",
    to: "Shradha",
    message: "I am fine, thank you!",
    created_at: new Date(),
  },
];

// Chat.insertMany(AllChat)
//   .then((res) => {
//     console.log(res);
//     console.log("All chats saved successfully!");
//   })
//   .catch((err) => {
//     console.log("Error saving chats:", err);
//   });
