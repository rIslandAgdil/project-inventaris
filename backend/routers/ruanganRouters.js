const createProtectedRouter = require("../middlewares/protectedRoute");
const router = createProtectedRouter();
const {
  getAllRuangan,
  getRuanganById,
  createRuangan,
  updateRuangan,
  deleteRuangan,
} = require("../controllers/ruanganControllers");

router.get("/", getAllRuangan);
router.post("/", createRuangan);
router.get("/:id", getRuanganById);
router.put("/:id", updateRuangan);
router.delete("/:id", deleteRuangan);

module.exports = router;
