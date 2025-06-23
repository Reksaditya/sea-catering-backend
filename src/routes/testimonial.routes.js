const express = require("express");
const router = express.Router();
const { createTestimonial, getAllTestimonials } = require("../controllers/testimonial.controllers");

router.get("/", getAllTestimonials);
router.post("/", createTestimonial);

module.exports = router;