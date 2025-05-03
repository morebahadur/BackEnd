const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/register', (req, res) => {
    let { user, password } = req.query; 
    console.log(req.query);
    res.send(`standard get request! welcome ${user}`);
})
app.post('/register', (req, res) => {
    let { user, password } = req.body;
    console.log(req.body);
    res.send(`standard post request! welcome.${user}`);
})
// app.post('/register', (req, res) => {
//     console.log("i am post");
//     let { user, password } = req.body;
//     console.log(req.body);
//     res.send(`standard post request! welcome ${user}`);
// })
app.listen(3000, () => {
    console.log("running in post 3000");
});