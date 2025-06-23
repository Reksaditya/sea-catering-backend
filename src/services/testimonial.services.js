const prisma = require('../prisma/client');

async function addTestimonial({ name, message, rating, userId }) {
  const testimonial = await prisma.testimonial.create({
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
  const testimonials = await prisma.testimonial.findMany();
  return testimonials;
}

module.exports = { addTestimonial, fetchTestimonials }