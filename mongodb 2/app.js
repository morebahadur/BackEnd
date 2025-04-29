const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const user = require('./models/user');
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // res.render("index.ejs");
    res.render('index');
})
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read', { users });
})

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        // name:name,
        // email:email,
        // image:image,
        name,
        email,
        image
    })
    res.redirect("/read");
})
app.get('/delete/:id', async (req, res) => {
    // const { id } = req.params;
    // await userModel.findByIdAndDelete(id);
    // res.redirect("/read");

    let users = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
})

app.get('/edit/:userid', async (req, res) => {
    let users = await userModel.findOne({ _id: req.params.userid });
    res.render('edit', { users });
})
app.post('/update/:userid', async (req, res) => {
    let { image, email, name } = req.body;
    let users = await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, email, name }, { new: true });
    res.redirect("/read");
})

app.listen(3000, () => {
    console.log("Now I am Running ...............");
});