const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const methodOverride = require("method-override");


const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
let post = [
  {
    id: uuidv4(),
    username: "John Doe",
    content: "Hello World!",
  },
  {
    id: uuidv4(),
    username: "Jane Doe",
    content: "Hello World!",
  },
  {
    id: uuidv4(),
    username: "John Smith",
    content: "Hello World!",
  },
];
app.get("/posts", (req, res) => {
  res.render("index", { posts: post });
});
app.get("/posts/new", (req, res) => {
  res.render("new");
});
app.post("/posts", (req, res) => {
  console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  post.push({ id, username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let posting = post.find((p) => id == p.id);
  if (!posting) {
    return res.status(404).send("Post not found");
  } else {
    res.render("show", { posting });
  }
});

app.patch('/posts/:id', (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let posting = post.find((p) => id == p.id);
  posting.content = newContent;
  console.log(posting);
  res.redirect(`/posts`);
})
app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params;
  console.log(id);
  let posting = post.find((p) => id == p.id);
  res.render('edit', { posting });
})
app.delete('/posts/:id', (req, res) => {
  let { id } = req.params;
  post = post.filter((p) => p.id != id);
  res.redirect('/posts');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
           