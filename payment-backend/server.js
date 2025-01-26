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
  origin: 'https://kojib.com', // Replace with your actual frontend URL
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Define your Stripe Price ID (Replace with your actual Price ID)
const PRICE_ID = 'price_1QlCQBCnElKewPPGLTYivsut'; // Example Price ID

// Endpoint to handle payment and appointment scheduling
app.post('/api/schedule', async (req, res) => {
  const { paymentMethodId, appointmentData } = req.body;

  // Validate input
  if (!paymentMethodId || !appointmentData) {
    return res.status(400).json({ error: 'Missing paymentMethodId or appointmentData' });
  }

  try {
    // Create a PaymentIntent using the Price ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 0, // Amount is derived from the Price ID
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      // Link the PaymentIntent to the Price ID via metadata or handle it accordingly
      // Since PaymentIntents don't directly accept Price IDs, we can store it in metadata
      metadata: {
        price_id: PRICE_ID,
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
