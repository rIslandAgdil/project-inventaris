const createProtectedRouter = require("../middlewares/protectedRoute");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// Membuat router yang terproteksi
const router = createProtectedRouter();

// Route yang membutuhkan autentikasi
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
