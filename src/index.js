require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

const mealPlanRoutes = require('./routes/mealplan.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const userRoutes = require('./routes/user.routes');
const subscriptionRoutes = require('./routes/subscription.routes');

app.use(cors(
  {
    origin: 'http://localhost:3000'
  }
));
app.use(express.json());

app.use('/mealplan', mealPlanRoutes);
app.use('/testimonial', testimonialRoutes);
app.use('/user', userRoutes);
app.use('/subscription', subscriptionRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});