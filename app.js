const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_connection_string' with your actual MongoDB connection string)
mongoose.connect('your_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  pincode: String,
  graduation: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send('User registered successfully!');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
