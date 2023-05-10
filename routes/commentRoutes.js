const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas relacionadas a los comentarios:
// ...
router.post("/", ensureAuthenticated, commentController.store);

module.exports = router;
