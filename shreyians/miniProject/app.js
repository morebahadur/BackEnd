const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/profile", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send("login");  
});

app.post('/register', async (req, res) => {
    const { name, username, age, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("user already exists");
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            let user = userModel.create({
                name,
                username,
                age,
                email,
                password: hash
            });
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
            res.cookie("token", token);
            res.send("user created successfully");
        })
    });

})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("user not found");
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
            res.cookie("token", token);
            res.status(200).send("you can login now");
        }
        else res.redirect("/login");
    })
})
app.get('/logout', (req, res) => {
    res.clearCookie("token", "");
    res.redirect("/login");
})

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") {
        res.send("please login first");
    } else {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
    }
    next();
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});