const express = require("express");
//index - users
app.get("/users", (req, res) => {
    res.send("GET for users");
});
//show-users
app.get("/users/:id", (req, res) => {
    res.send("GET for users with id");
});
//post-users
app.post("/users", (req, res) => {
    res.send("Post for users");
});
//delete-users
app.delete("/users/:id", (req, res) => {
    res.send("Delete for users");
});