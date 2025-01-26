// server.js

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config(); // Load environment variables

// Initialize Stripe with your secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors({
  origin: 'https://your-frontend-domain.com', // Replace with your actual frontend URL
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Endpoint to handle payment and appointment scheduling
app.post('/api/schedule', async (req, res) => {
  const { paymentMethodId, appointmentData } = req.body;

  // Validate input
  if (!paymentMethodId || !appointmentData) {
    return res.status(400).json({ error: 'Missing paymentMethodId or appointmentData' });
  }

  // Define the amount to charge (e.g., $50.00 -> 5000 cents)
  // Modify this as needed based on your pricing strategy
  const amount = 5000; // in cents

  try {
    // Create a PaymentIntent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'automatic',
      confirm: true,
      metadata: {
        name: appointmentData.name,
        email: appointmentData.email,
        date: appointmentData.date,
        time: appointmentData.time,
      },
    });

    // Optionally, handle storing appointment data in a database here

    // Respond with success and payment intent details
    res.json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Payment backend server is running on port ${PORT}`);
});
