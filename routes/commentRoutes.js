const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
router.post("/", commentController.store);
router.get("/:id", commentController.show);

module.exports = router;
