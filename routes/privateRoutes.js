const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/admin", adminController.show);
router.get("/api/articulos", articleController.showApi);

module.exports = router;
