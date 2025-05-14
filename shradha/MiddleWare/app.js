const express = require("express");
const app = express();
const expressError = require("./expressError");
const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveacess") {
        next();
    }
    throw new expressError(401, "Access Denied!");
}
app.get("/api", checkToken, (req, res) => {
    res.send("data");
})
app.get("/", (req, res) => {
    res.send("I am the Root!");
});

app.get("/error", (req, res, next) => {
    let abc = abc;
    // res.send("i am hero");
});

// Error handling middleware (must be after routes, before 404)
app.use((err, req, res, next) => {
    let { status=500, message } = err; //by default error status will be 500 if there is no status range
    res.status(status).send(message);
});

// 404 handler should be last
app.use((req, res) => {
    res.status(404).send("Page not found!");
});

app.listen(8080, () => {
    console.log("I am running at 8080!");
});