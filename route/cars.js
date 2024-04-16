const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth");
const carController = require("../controller/cars");

router
    .route("/")
    .get(authMiddleware(["member", "admin", "superadmin"]), carController.getCars)
    .post(authMiddleware(["admin", "superadmin"]), carController.createCar);

router
    .route("/:id")
    .get(authMiddleware(["member", "admin", "superadmin"]), carController.getCar)
    .put(authMiddleware(["admin", "superadmin"]), carController.updateCar)
    .delete(authMiddleware(["admin", "superadmin"]), carController.deleteCar);

    module.exports = router;