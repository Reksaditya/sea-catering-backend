const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getAllUsers, deleteUser } = require("../controllers/user.controllers");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getAllUsers);
router.delete("/", deleteUser);

module.exports = router;