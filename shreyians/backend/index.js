const express = require('express');
const app = express();
const Path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    res.render("index");
});
app.get("/profile/:username", function (req, res) {
    // req.params.username=
    res.send(`welcome ${req.params.username}`);
})
app.get("/author/:username/:age", function (req, res) {
    res.send(`author: ${req.params.username} age: ${req.params.age}`);
})
app.listen(3000, function () {
    console.log("it's running........");
})
