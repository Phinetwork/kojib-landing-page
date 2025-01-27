// server.js
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors({
  origin: 'https://your-frontend-domain.com', // Replace with your actual frontend URL
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// Endpoint to process payment
app.post('/api/process-payment', async (req, res) => {
  const { paymentMethodId, amount, appointmentData } = req.body;

  if (!paymentMethodId || !amount || !appointmentData) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Create a PaymentIntent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      metadata: {
        name: appointmentData.name,
        email: appointmentData.email,
        date: appointmentData.date,
        time: appointmentData.time,
      },
    });

    // Handle next actions if any
    if (paymentIntent.status === 'requires_action' && paymentIntent.next_action.type === 'use_stripe_sdk') {
      // Tell the client to handle the action
      return res.json({
        requiresAction: true,
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      await handlePostPayment(appointmentData);
      return res.json({ success: true });
    } else {
      // Invalid status
      return res.status(400).json({ error: 'Invalid PaymentIntent status.' });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Function to handle post-payment actions
async function handlePostPayment(appointmentData) {
  // 1. Save appointment to database
  await saveAppointmentToDatabase(appointmentData);

  // 2. Create Google Calendar event
  await createGoogleCalendarEvent(appointmentData);

  // 3. Send confirmation email
  await sendConfirmationEmail(appointmentData);
}

// Function to save appointment to database (replace with actual DB logic)
async function saveAppointmentToDatabase(appointmentData) {
  // Example: Insert into MongoDB
  // const Appointment = require('./models/Appointment'); // Mongoose model
  // const newAppointment = new Appointment(appointmentData);
  // await newAppointment.save();
  
  // Placeholder for actual implementation
  console.log('Saving appointment to database:', appointmentData);
}

// Function to create Google Calendar event
async function createGoogleCalendarEvent(appointmentData) {
  // Configure Google API credentials
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Convert date and time to ISO format
  const startDateTime = new Date(`${appointmentData.date}T${convertTimeTo24Hour(appointmentData.time)}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

  const event = {
    summary: `Initial Assessment with ${appointmentData.name}`,
    description: `Appointment scheduled by ${appointmentData.name} (${appointmentData.email}).`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/New_York', // Adjust to your timezone
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/New_York',
    },
    attendees: [{ email: appointmentData.email }],
    reminders: {
      useDefault: true,
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('Google Calendar event created:', response.data);
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
}

// Function to send confirmation email
async function sendConfirmationEmail(appointmentData) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: '"Kojib Scheduler" <no-reply@kojibscheduler.com>', // Replace with your sender address
    to: appointmentData.email, // Recipient's email
    subject: 'Your Assessment Appointment is Confirmed',
    text: `Hello ${appointmentData.name},\n\nYour assessment is scheduled on ${appointmentData.date} at ${appointmentData.time}.\n\nThank you!`,
    // You can also add HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', appointmentData.email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}

// Helper function to convert 12-hour time to 24-hour format
function convertTimeTo24Hour(time) {
  const [timePart, meridiem] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Payment backend server is running on port ${PORT}`);
});
