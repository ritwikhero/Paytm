const express = require("express");

const userRouter = require("./user");

const router = express.Router();

router.subscribe("/user",userRouter);

module.exports = router;