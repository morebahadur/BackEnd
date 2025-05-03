const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log(req);
//     res.send("i am giving you a response that is I am fine No need to worry about me.");
// })

app.get('/', (req, res) => {
    res.send("you are in root path.");
    console.log("reqest receive from root.");
})

app.get('/apple', (req, res) => {
    res.send("you are in apple path.");
    console.log("reqest receive from apple root.");
})

app.get('/color', (req, res) => {
    res.send("you are in color path.");
    console.log("reqest receive from color root.");
})

app.get('/:username/:id', (req, res) => {
    let { username, id } = req.params;
    console.log(req.params);
    res.send(`you are in page of @${username}.`);

})
// ...existing code...

app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    console.log('Search Query:', req.query);  // For debugging
    
    if (searchQuery) {
        res.send(`You are searching for: ${searchQuery}`);
    } else {
        res.send('Please provide a search term using ?q=qurey_string');
    }
});

// ...existing code...

app.listen(3000, () => {
    console.log("i am running at 3000.");
})