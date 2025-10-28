const createProtectedRouter = require("../middlewares/protectedRoute");
const router = createProtectedRouter();
const {
  createBarang,
  getBarang,
  getBarangById,
  updateBarang,
  deleteBarang,
} = require("../controllers/barangControllers");

router.post("/", createBarang);
router.get("/", getBarang);
router.get("/:id", getBarangById);
router.put("/:id", updateBarang);
router.delete("/:id", deleteBarang);

module.exports = router;
