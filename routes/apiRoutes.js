var express = require("express");

var apiController = require("../controllers/apiController");

var router = new express.Router();

router.post("/articles/", apiController.create);

module.exports = router;
