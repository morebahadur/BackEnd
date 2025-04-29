const express = require('express');
const app = express();
const Path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs'); //store configuration like css,appjs,html
app.use(express.json());//midleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files });
    })
})

app.get('/files/:filename', function (req, res) { //it is used for the route
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});
app.get('/edit/:filename', function (req, res) {
    res.render('edit', { filename: req.params.filename });
});

app.post('/edit', function (req, res) {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
        res.redirect("/");
    })
})

app.post('/create', function (req, res) { //it is used for the route
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail, function (err) {
        res.redirect("/");
    });
});

app.listen(3000, function () {
    console.log("i am running");
});