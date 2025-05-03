const express = require('express');
const app = express();
const usermodel = require("./usermodel");

app.get('/', (req, res) => {
    res.send("Good Job!");
})
app.get('/create', async (req, res) => {
    let createdUser = await usermodel.create({
        name: "dipa",
        username: "dipak4064",
        email: "dt14149266@gmail.com"
    });
    res.send(createdUser);
})
app.get('/update', async (req, res) => {
    let updateduser = await usermodel.findOneAndUpdate({ username: "dipak4064" }, { name: "deepak" }, { new: true });
    res.send(updateduser);
})
app.get('/read', async (req, res) => {
    let user = await usermodel.find();
    res.send(user);
})
app.get('/delete', async (req, res) => {
    let user = await usermodel.findOneAndDelete({name:"dipa"});
    res.send(user);
})

app.listen(3000, () => {
    console.log("running ..............")
});