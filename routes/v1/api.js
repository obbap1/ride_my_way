const express = require("express");
const router = express.Router();

const authController = require("./auth-route");

router.use("/auth", authController);

module.exports = router;
