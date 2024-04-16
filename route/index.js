const express = require("express");
const router = express.Router();
const specs = require("./spec");
const cars = require("./cars");
const auth = require("./auth");

router.use("/auth", auth);
router.use("/specs", specs);
router.use("/cars", cars);

module.exports = router;