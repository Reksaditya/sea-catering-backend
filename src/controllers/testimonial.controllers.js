const {  addTestimonial, fetchTestimonials } = require("../services/testimonial.services");

async function createTestimonial(req, res) {
  const { name, message, rating, userId } = req.body;

  const user = await prisma.User.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found, please login first" });
  }

  const testimonial = await addTestimonial({ name, message, rating, userId });
  res.status(201).json(testimonial);
}

async function getAllTestimonials(req, res) {
  const testimonials = await fetchTestimonials();
  res.json(testimonials);
}

module.exports = { createTestimonial, getAllTestimonials };
