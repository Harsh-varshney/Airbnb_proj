const express = require("express");
const router = express.Router();

// index route
router.get("/",(req,res) => {
    res.send("get for posts");
});

// show route
router.get("/:id",(req,res) => {
    res.send("get for show posts");
});

// post user
router.post("/",(req,res) => {
    res.send("post for posts");
});

// delete route
router.delete("/:id",(req,res) => {
    res.send("delete for posts id");
});

module.exports = router;