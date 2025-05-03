const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// app.get('/', (req, res) => {//cookie set and hash code (bcrypt)
//     // res.cookie("name", "harsh");
//     // res.send("cookie set");
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash("pololololoo", salt, function (err, hash) {
//             console.log(hash);
//         });
//     });
//     res.send("hash code is appear at console");
// });

//decreption code
/*app.get('/', (req, res) => {
   bcrypt.compare("pololololoo", "$2b$10$LnVY4Phq1BrOW9a2NZDHA.AIIQc1D2.hWtOo7tpe.6HyBaIUgiVV2", function(err, result) {
       // result == true
       console.log(result);
       res.send("hash code is appear at console");
   });
});*/

app.get('/', (req, res) => {
    // const token = jwt.sign({ id:
    let token = jwt.sign({ email: "email@gmail.com" }, "secrete");
    console.log(token);
    res.cookie("token", token);
    res.send("token is appear at console");
});
app.get('/varify', (req, res) => {
    console.log("token: ", req.cookies);
    let data = jwt.verify(req.cookies.token, "secrete");
    console.log(data);
})
// app.get('/read', (req, res) => {
//     console.log('Cookies: ', req.cookies);
//     res.send("cookie read check console");
// });
app.listen(3000); 