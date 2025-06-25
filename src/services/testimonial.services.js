const prisma = require('../prisma/client');

async function addTestimonial({ name, message, rating, userId }) {
  const testimonial = await prisma.Testimonial.create({
    data: {
      name,
      message,
      rating,
      userId
    },
  });
  return testimonial;
} 

async function fetchTestimonials() {
  const testimonials = await prisma.Testimonial.findMany();
  return testimonials;
}

module.exports = { addTestimonial, fetchTestimonials }