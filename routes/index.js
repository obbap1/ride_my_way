var express = require("express");
var router = express.Router();

const apiV1 = require("./v1/api");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api/v1", apiV1);

module.exports = router;
