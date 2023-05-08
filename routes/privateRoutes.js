const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/admin", articleController.showAdmin);
router.get("/api/articulos", articleController.showApi);

module.exports = router;
