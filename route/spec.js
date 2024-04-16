const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/auth");
const specController = require("../controller/spec");

router
    .route("/")
    .get(authMiddleware(["member", "admin", "superadmin"]),specController.getSpecs)
    .post(authMiddleware(["admin", "superadmin"]),specController.createSpec);

router
    .route("/:id")
    .get(authMiddleware(["member", "admin", "superadmin"]),specController.getSpec)
    .put(authMiddleware(["admin", "superadmin"]),specController.updateSpec)
    .delete(authMiddleware(["admin", "superadmin"]),specController.deleteSpec);

module.exports = router;