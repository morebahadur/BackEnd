const express = require("express");
const router = express.Router();

//index
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// show
router.get("/:id", (req, res) => {
    res.send("GET for posts id");
});  

//post
router.post("/", (req, res) => {
    res.send("Post for posts");
});  

//delete
router.delete("/:id", (req, res) => {
    res.send("Delete for posts id");
});
module.exports = router;
