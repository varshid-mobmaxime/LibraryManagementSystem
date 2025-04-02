const router = require("express").Router();

const { getDashboardDetails } = require("../controller/BooksController");
const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/UserController");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/users", authenticate, authorize(["admin"]), getUsers);

router.put("/update-user/:id", authenticate, authorize(["admin"]), updateUser);
router.delete(
  "/delete-user/:id",
  authenticate,
  authorize(["admin"]),
  deleteUser
);
router.get(
  "/dashboard-details",
  authenticate,
  authorize(["admin"]),
  getDashboardDetails
);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
