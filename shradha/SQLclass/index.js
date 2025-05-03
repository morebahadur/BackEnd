const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user",
  password: "hello",
});

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

app.get("/", (req, res) => {
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
});

//show route
app.get("/user", (req, res) => {
  let q = "SELECT * FROM delta_app";
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      //   console.log(results);
      res.render("user", { data: results });
    });
  } catch (err) {
    console.log(err);
    res.send("some error accured");
  }
});

//edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM delta_app WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //   console.log(result[0]);
      res.render("edit", { user: result[0] });
    });
  } catch (error) {
    res.send("some error accured");
    console.log(error);
  }
});

//update route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUsername } = req.body;
  let q = `SELECT * FROM delta_app WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPassword != user.password) {
        res.send("password is not correct");
      }
      let q2 = `UPDATE delta_app SET username='${newUsername}' WHERE id='${id}'`;
      connection.query(q2, (err, results) => {
        if (err) throw err;
        res.redirect("/user");
      });
    });
  } catch (error) {
    console.log(error);
    res.send("some error accured");
  }
});

//add new user route
app.get("/adduser", (req, res) => {
  res.render("newuser");
});

app.post("/adduser", (req, res) => {
  let { id, username, email, password } = req.body;
  let q = `INSERT INTO DELTA_APP (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;

  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some error occured");
  }
});

//deleting user route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let q = `SELECT * FROM delta_app WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      res.render("delete", { user: result[0] });
    });
  } catch (error) {
    res.send("some error accured");
    console.log(error);
  }
});

app.post("/user/:id/delete", (req, res) => {
  let {
    password: formPassword,
    username: formUsername,
    email: formEmail,
  } = req.body;
  let { id } = req.params;

  let q = `SELECT * FROM delta_app WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);
      if (
        formPassword != user.password &&
        formUsername != user.username &&
        formEmail != user.email
      ) {
        res.send("Not found");
      } else {
        let q2 = `DELETE FROM delta_app WHERE id='${id}'`;
        try {
          connection.query(q2, (err, results) => {
            if (err) throw err;
            res.redirect("/user");
          });
        } catch (error) {
          console.log(error);
          res.send("some error accured");
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.send("some error accured");
  }
});

app.listen(3000, () => {
  console.log("Server i s running on port 3000");
});
