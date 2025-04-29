const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'user',
    password: 'hello',
})

// const q = "INSERT INTO delta_app (id, username, email, password) VALUES ?";
// const values = [];
// for (let i = 0; i < 10; i++)
//     values.push(getRandomUser());

// try {
//     connection.query(q, [values], (err, results) => {
//         if (err) throw err;
//         console.log(results);
//     })
// } catch (err) {
//     console.log(err);
// }
// connection.end();


app.get('/', (req, res) => {
    let q = "SELECT COUNT(*) FROM delta_app";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            // console.log(results[0]['COUNT(*)']);
            console.log(results);
            res.render("home", { data: results[0]["COUNT(*)"] });
        });
    } catch (err) {
        console.log(err);
        res.send("some error accured");
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});