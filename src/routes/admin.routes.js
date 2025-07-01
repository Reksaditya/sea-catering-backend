const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require("../middleware/isAdmin");
const { getAdminMetrics } = require("../controllers/admin.controllers");

router.get("/metrics", auth, isAdmin, getAdminMetrics);

module.exports = router;