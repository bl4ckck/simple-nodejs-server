const express = require("express");
const router = express.Router();

const todo = require("./todoRoutes");

router.use("/todo", todo);

module.exports = router;
