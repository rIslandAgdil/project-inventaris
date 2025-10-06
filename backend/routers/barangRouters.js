const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangControllers');

router.post("/", barangController.createBarang);
router.get("/", barangController.getBarang);
router.get("/:id", barangController.getBarangBy);
router.put("/:id", barangController.updateBarang);
router.delete("/:id", barangController.deleteBarang);

module.exports = router;