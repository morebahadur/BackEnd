const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send("i am the root route!");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});