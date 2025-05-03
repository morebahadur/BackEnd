const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home', { name: 'John Doe' });
})
app.get('/about', (req, res) => {
  res.send('About Page');
})

app.get('/rolldice', (req, res) => {
  let num = Math.floor(Math.random() * 6) + 1;
  res.render('rolldice', { nums: num });
})

// app.get('/ig/:username', (req, res) => {
//   let followers = ["dipak", "milan", "suresh"];
//   let { username } = req.params;
//   res.render('instagram', { username ,followers});
// })
app.get('/ig/:username', (req, res) => {
  let { username } = req.params;
  let instadata = require('./data.json');
  let data = instadata[username];
  if (data) {
    res.render('instagram', { data });
  } else {
    res.render('error.ejs');
  }
})

app.listen(8080, (req, res) => {
  console.log('Server is running on port 8080');
});