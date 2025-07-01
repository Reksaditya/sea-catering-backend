const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { loginUser, registerUser, getAllUsers, getUserId, deleteUser, updateUser, fetchSubscriptions } = require("../controllers/user.controllers");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getAllUsers);
router.get("/:id", auth, getUserId);
router.patch("/", deleteUser);
router.patch("/update/:id", updateUser);
router.get("/", auth, fetchSubscriptions);

module.exports = router;